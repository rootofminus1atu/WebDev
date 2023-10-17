clubs = [
    {
        name: 'Fishing Club',
        description: `Experience the tranquility of local waters with the Fishing Club, under the guidance of the enthusiastic angler, Perrell Brown aka Dreamy. Discover the art of fishing, whether you're a novice or an expert, in a welcoming and relaxed atmosphere.`,
        imgName: 'fishing-club.webp',
        pageLinkName: 'fishing-club'
    },
    {
        name: 'Golf Club',
        description: `Join the Golf Club, featuring a special guest appearance by the one and only DJ Khaled. Tee off on our picturesque golf course, regardless of your skill level. Our club offers a welcoming and enjoyable environment for golf enthusiasts to relax and improve their skills.`,
        imgName: 'golf-club.jpeg',
        pageLinkName: 'fishing-club'
    },
    {
        name: 'Chemistry Club',
        description: `Explore the fascinating world of chemistry with the Chemistry Club, where you'll receive exclusive private lessons from the legendary duo, Walter White and Jesse Pinkman. Uncover the science behind everything and take advantage of this unique opportunity to learn from the best in the field.`,
        imgName: 'chem-club.jpg',
        pageLinkName: 'fishing-club'
    },
    {
        name: 'Military Club',
        description: `Join the Military Club, where we've got you covered if you need more bullets, if you need bigger weapons, or if you need protein. Under the leadership of the fearless Mr. Morboulez, you'll delve into military tactics, discipline, and strength training.`,
        imgName: 'military-club.jpg',
        pageLinkName: 'fishing-club'
    },
    
]




class TemplatizeError extends Error {
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


function templatize(element) {
    const listName = element.getAttribute("json-list");

    if (!listName) {
        throw new TemplatizeError("You forgot to add a 'json-list' attribute to your templatize div.");
    }

    // there's prob a better way to do that
    const list = window[listName];

    if (!list) {
        throw new TemplatizeError(`A list named '${listName}' could not be found.`);
    }


    const template = element.innerHTML
    element.innerHTML = ''

    const htmlContent = list
        .map(item => {
            try {
                return fillTemplate(template, item) 
            } catch (error) {
                throw new TemplatizeError(`${error.message} Make sure that '${listName}' contains objects that all have that property. Or that the HTML template is using the right property name.`);
            }
        })
        .join('')

    element.innerHTML = htmlContent

}


function templatizeAll() {
    const elements = Array.from(document.getElementsByClassName("templatize"))

    elements.forEach(element => templatize(element))
}

templatizeAll()

