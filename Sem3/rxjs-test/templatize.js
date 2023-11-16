export class TemplatizeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TemplatizeError";
    }
}

function fillTemplate(template, item) {
    const regex = /{([^}]+)}/g

    const result = template.replace(regex, match => {
        const trimmedMatch = match.slice(1, -1) 

        if (!item.hasOwnProperty(trimmedMatch)) {
            throw new TemplatizeError(`Property '${trimmedMatch}' not found in the object.`)
        }

        return item[trimmedMatch]
    })

    return result
}

/// works only with static content...
export function templatize(element, list) {
    if (!list) {
        throw new TemplatizeError(`A list named '${list}' could not be found.`);
    }


    const template = element.innerHTML
    element.innerHTML = ''

    const htmlContent = list
        .map(item => {
            try {
                return fillTemplate(template, item) 
            } catch (error) {
                throw new TemplatizeError(`${error.message} Make sure that '${list}' contains objects that all have that property. Or that the HTML template is using the right property name.`);
            }
        })
        .join('')

    element.innerHTML = htmlContent

}