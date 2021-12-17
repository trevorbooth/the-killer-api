const PORT = 8000
const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');

const app = express()

const killers = [
    {
        name: 'Luis Garavito',
        address: 'https://en.wikipedia.org/wiki/Luis_Garavito'
    },
    {
        name: 'Pedro López',
        address: 'https://en.wikipedia.org/wiki/Pedro_L%C3%B3pez_(serial_killer)'
    },
    {
        name: 'Javed Iqbal',
        address: 'https://en.wikipedia.org/wiki/Javed_Iqbal_(serial_killer)'
    },
    {
        name: 'Mikhail Popkov',
        address: 'https://en.wikipedia.org/wiki/Mikhail_Popkov'
    },
    {
        name: 'Daniel Camargo Barbosa',
        address: 'https://en.wikipedia.org/wiki/Daniel_Camargo_Barbosa'
    },
    {
        name: 'Pedro Rodrigues Filho',
        address: 'https://en.wikipedia.org/wiki/Pedro_Rodrigues_Filho'
    },
    {
        name: 'Kampatimar Shankariya',
        address: 'https://en.wikipedia.org/wiki/Kampatimar_Shankariya'
    },
    {
        name: 'Yang Xinhai',
        address: 'https://en.wikipedia.org/wiki/Yang_Xinhai'
    },
    {
        name: 'Samuel Little',
        address: 'https://en.wikipedia.org/wiki/Samuel_Little'
    },
    {
        name: 'Giuseppe Greco',
        address: 'https://en.wikipedia.org/wiki/Giuseppe_Greco'
    },
    {
        name: 'Andrei Chikatilo',
        address: 'https://en.wikipedia.org/wiki/Andrei_Chikatilo'
    },
    {
        name: 'Anatoly Onoprienko',
        address: 'https://en.wikipedia.org/wiki/Anatoly_Onoprienko'
    },
    {
        name: 'Florisvaldo de Oliveira',
        address: 'https://en.wikipedia.org/wiki/Florisvaldo_de_Oliveira'
    },
    {
        name: 'Willy Pickton',
        address: 'https://en.wikipedia.org/wiki/Robert_Pickton'
    },
    {
        name: 'Gary Ridgway',
        address: 'https://en.wikipedia.org/wiki/Gary_Ridgway'
    },
    {
        name: 'Alexander Pichushkin',
        address: 'https://en.wikipedia.org/wiki/Alexander_Pichushkin'
    },
    {
        name: 'Wang Qiang',
        address: 'https://en.wikipedia.org/wiki/Wang_Qiang_(serial_killer)'
    },
    {
        name: 'Ahmad Suradji',
        address: 'https://en.wikipedia.org/wiki/Ahmad_Suradji'
    },
    {
        name: 'Raman Raghav',
        address: 'https://en.wikipedia.org/wiki/Raman_Raghav'
    },
    {
        name: 'Tiago Henrique Gomes da Rocha',
        address: 'https://en.wikipedia.org/wiki/Tiago_Henrique_Gomes_da_Rocha'
    },
    {
        name: 'Moses Sithole',
        address: 'https://en.wikipedia.org/wiki/Moses_Sithole'
    },
    {
        name: 'Mohammed Bijeh',
        address: 'https://en.wikipedia.org/wiki/Mohammed_Bijeh'
    },
    {
        name: 'Serhiy Tkach',
        address: 'https://en.wikipedia.org/wiki/Serhiy_Tkach'
    },
    {
        name: 'Gennady Mikhasevich',
        address: 'https://en.wikipedia.org/wiki/Gennady_Mikhasevich'
    },
    {
        name: 'Hadj Mohammed Mesfewi',
        address: 'https://en.wikipedia.org/wiki/Hadj_Mohammed_Mesfewi'
    },
    {
        name: 'Vera Renczi',
        address: 'https://en.wikipedia.org/wiki/Vera_Renczi'
    },
    {
        name: 'Ted Bundy',
        address: 'https://en.wikipedia.org/wiki/Ted_Bundy'
    },
    {
        name: 'Clementine Barnabet',
        address: 'https://en.wikipedia.org/wiki/Clementine_Barnabet'
    },
    {
        name: 'John Wayne Gacy',
        address: 'https://en.wikipedia.org/wiki/John_Wayne_Gacy'
    },
    {
        name: 'Ali Asghar Borujerdi',
        address: 'https://en.wikipedia.org/wiki/Asghar_the_Murderer'
    },
    {
        name: 'Vasili Komaroff',
        address: 'https://en.wikipedia.org/wiki/Vasili_Komaroff'
    },
    {
        name: 'Fernando Hernández Leyva',
        address: 'https://en.wikipedia.org/wiki/Fernando_Hern%C3%A1ndez_Leyva'
    },
    {
        name: 'Ramadan Abdel Rehim Mansour',
        address: 'https://en.wikipedia.org/wiki/Ramadan_Abdel_Rehim_Mansour'
    },
    {
        name: 'Radik Tagirov',
        address: 'https://en.wikipedia.org/wiki/Radik_Tagirov'
    },
    {
        name: 'Karl Denke',
        address: 'https://en.wikipedia.org/wiki/Karl_Denke'
    },
    {
        name: 'Francisco das Chagas Rodrigues de Brito',
        address: 'https://en.wikipedia.org/wiki/Francisco_das_Chagas_Rodrigues_de_Brito'
    },
    {
        name: 'Luis Gregorio Ramírez Maestre',
        address: 'https://en.wikipedia.org/wiki/Luis_Gregorio_Ram%C3%ADrez_Maestre'
    },
    {
        name: 'David Thabo Simelane',
        address: 'https://en.wikipedia.org/wiki/David_Thabo_Simelane'
    },
    {
        name: 'Zhang Jun',
        address: 'https://en.wikipedia.org/wiki/Zhang_Jun_(serial_killer)'
    },
    {
        name: 'Herman Webster Mudgett',
        address: 'https://en.wikipedia.org/wiki/H._H._Holmes'
    },
    {
        name: 'Cedric Maake',
        address: 'https://en.wikipedia.org/wiki/Cedric_Maake'
    },
    {
        name: 'Mariam Soulakiotis',
        address: 'https://en.wikipedia.org/wiki/Mariam_Soulakiotis'
    },
    {
        name: 'Bruce George Peter Lee',
        address: 'https://en.wikipedia.org/wiki/Bruce_George_Peter_Lee'
    },
    {
        name: 'The Stoneman',
        address: 'https://en.wikipedia.org/wiki/Stoneman'
    },
    {
        name: 'Juan Corona',
        address: 'https://en.wikipedia.org/wiki/Juan_Corona'
    },
    {
        name: 'Fritz Haarmann',
        address: 'https://en.wikipedia.org/wiki/Fritz_Haarmann'
    },
    {
        name: 'Béla Kiss',
        address: 'https://en.wikipedia.org/wiki/B%C3%A9la_Kiss'
    },
    {
        name: 'Majid Salek Mohammadi',
        address: 'https://en.wikipedia.org/wiki/Majid_Salek_Mohammadi'
    }
]



const articles = []

killers.forEach(killer => {
    axios.get(killer.address)
        .then(response => {

            const html = response.data
            const $ = cheerio.load(html)

            $('table.biography > tbody', html).each(function () {

                // const protocol = 'https:'
                // const imgFilePath = $('img').parent('.infobox-image').attr('src')
                // const img = protocol + imgFilePath

                $(html).find('br').replaceWith('/n')


                const born = $('tr:contains("Born")').children('td').text()
                const died = $('tr:contains("Died")').children('td').text()
                const death = $('tr:contains("death")').children('td').text()
                const nicknames = $('tr:contains("names")').children('td').text()
                const height = $('tr:contains("Height")').children('td').text()
                const penalty = $('tr:contains("Penalty")').children('td').text()
                const charges = $('tr:contains("penalty")').children('td').text()
                const methods = $('tr:contains("Conviction(s)")').children('td').text()
                const motive = $('tr:contains("Motive")').children('td').text()
                const victims = $('tr:contains("Victims")').children('td').text()
                const active = $('tr:contains("crimes")').children('td').text()
                const country = $('tr:contains("Country")').children('td').text()
                const states = $('tr:contains("State(s)")').children('td').text()
                const apprehended = $('tr:contains("apprehended")').children('td').text()
                const imprisoned = $('tr:contains("Imprisoned")').children('td').text()
                //const about = $('p').text()

                // Account for Multiple Nick Names, states, etc. - Deal with <br>
                //const nicknames = otherNames.split('<br>').map(part => cheerio.load(part).text().trim())



                const tableRow = {
                    name: killer.name,
                    //photo: img,
                    born,
                    died,
                    death,
                    nicknames,
                    height,
                    'criminal penalty': penalty,
                    'charged with': charges,
                    'method(s)': methods,
                    motive,
                    victims,
                    active,
                    country,
                    'state(s)': states,
                    apprehended,
                    imprisoned,
                    //about,
                    source: killer.address
                }

                articles.push(tableRow)
            })



        }).catch(err => console.log(err))
})

// Welcome - Endpoint
app.get('/', (req, res) => {
    res.json('Welcome to The Killer API. Everything you need to know about Serial Killers.')
})

// All Killer Info - Endpoint
app.get('/serial-killers', (req, res) => {
    res.json(articles)
})




app.listen(PORT, () => console.log(`server running on ${PORT}`))