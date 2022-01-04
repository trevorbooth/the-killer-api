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
    },
    {
        name: 'Yvan Keller',
        address: 'https://en.wikipedia.org/wiki/Yvan_Keller'
    },
    {
        name: 'Ronald Dominique',
        address: 'https://en.wikipedia.org/wiki/Ronald_Dominique'
    },
    {
        name: 'Juan Fernando Hermosa',
        address: 'https://en.wikipedia.org/wiki/Juan_Fernando_Hermosa'
    },
    {
        name: 'Earle Nelson',
        address: 'https://en.wikipedia.org/wiki/Earle_Nelson'
    },
    {
        name: 'Leonard Lake',
        address: 'https://en.wikipedia.org/wiki/Leonard_Lake'
    },
    {
        name: 'Charles Ng',
        address: 'https://en.wikipedia.org/wiki/Charles_Ng'
    },
    {
        name: 'Shen Changyin and Shen Changping',
        address: 'https://en.wikipedia.org/wiki/Shen_Changyin_and_Shen_Changping'
    },
    {
        name: 'Polatbay Berdaliyev',
        address: 'https://en.wikipedia.org/wiki/Polatbay_Berdaliyev'
    },
    {
        name: 'Wolfgang Abel and Marco Faddressan',
        address: 'https://en.wikipedia.org/wiki/Wolfgang_Abel_and_Marco_Faddressan'
    },
    {
        name: 'Juan Carlos Hernández and Patricia Martínez',
        address: 'https://en.wikipedia.org/wiki/Monsters_of_Ecatepec'
    },
    {
        name: 'Joshi - Abhyankar serial murderers',
        address: 'https://en.wikipedia.org/wiki/Joshi-Abhyankar_serial_murders'
    },
    {
        name: 'Gerald and Charlene Gallego',
        address: 'https://en.wikipedia.org/wiki/Gerald_and_Charlene_Gallego'
    },
    {
        name: 'Viña del Mar psychopaths',
        address: 'https://en.wikipedia.org/wiki/Vi%C3%B1a_del_Mar_psychopaths'
    },
    {
        name: 'Yevgeny Nagorny',
        address: 'https://en.wikipedia.org/wiki/Yevgeny_Nagorny'
    },
    {
        name: 'National Socialist Underground',
        address: 'https://en.wikipedia.org/wiki/National_Socialist_Underground'
    },
    {
        name: 'Song Jinghua',
        address: 'https://en.wikipedia.org/wiki/Song_Jinghua'
    },
    {
        name: 'Tadeusz Grzesik',
        address: 'https://en.wikipedia.org/wiki/Tadeusz_Grzesik'
    },
    {
        name: 'Edgar Álvarez Cruz and Francisco Granados',
        address: 'https://en.wikipedia.org/wiki/Feminicides_of_the_cotton_field'
    },
    {
        name: 'The Ciudad Juárez Rebels',
        address: 'https://en.wikipedia.org/wiki/The_Ciudad_Ju%C3%A1rez_Rebels'
    },
    {
        name: 'The Manson Family cult killings',
        address: 'https://en.wikipedia.org/wiki/Manson_Family'
    },
    {
        name: 'Christopher Worrell and James Mille',
        address: 'https://en.wikipedia.org/wiki/Truro_murders'
    },
    {
        name: 'Kiss brothers and István Pető',
        address: 'https://en.wikipedia.org/wiki/Budapest_serial_killings'
    },
    {
        name: 'Ray and Faye Copeland',
        address: 'https://en.wikipedia.org/wiki/Ray_and_Faye_Copeland'
    },
    {
        name: 'Ian Brady',
        address: 'https://en.wikipedia.org/wiki/Ian_Brady'
    },
    {
        name: 'Myra Hindley',
        address: 'https://en.wikipedia.org/wiki/Myra_Hindley'
    },
    {
        name: 'Skin Hunters',
        address: 'https://en.wikipedia.org/wiki/Skin_Hunters'
    },
    {
        name: 'Loren Herzog and Wesley Shermantine',
        address: 'https://en.wikipedia.org/wiki/Speed_Freak_Killers'
    },
    {
        name: 'Raymond Fernandez and Martha Beck',
        address: 'https://en.wikipedia.org/wiki/Raymond_Fernandez_and_Martha_Beck'
    },
    {
        name: 'Beasts of Satan',
        address: 'https://en.wikipedia.org/wiki/Beasts_of_Satan'
    },
    {
        name: 'James Paster and Stephen McCoy',
        address: 'https://en.wikipedia.org/wiki/James_Paster_and_Stephen_McCoy'
    },
    {
        name: 'David Moor',
        address: 'https://en.wikipedia.org/wiki/David_Moor'
    },
    {
        name: 'Bruno Lüdke',
        address: 'https://en.wikipedia.org/wiki/Bruno_L%C3%BCdke'
    },
    {
        name: 'Highway of Tears Killer',
        address: 'https://en.wikipedia.org/wiki/Highway_of_Tears_murders'
    },
    {
        name: 'Howard Martin',
        address: 'https://en.wikipedia.org/wiki/Howard_Martin'
    },
    {
        name: 'Gerald Stano',
        address: 'https://en.wikipedia.org/wiki/Gerald_Stano'
    },
    {
        name: 'Orlando Sabino',
        address: 'https://en.wikipedia.org/wiki/Orlando_Sabino'
    },
    {
        name: 'Pedro Rosa da Conceição',
        address: 'https://en.wikipedia.org/wiki/Pedro_Rosa_da_Concei%C3%A7%C3%A3o'
    },
    {
        name: 'Henry Lee Lucas',
        address: 'https://en.wikipedia.org/wiki/Henry_Lee_Lucas'
    },
    {
        name: 'Charles Quansah',
        address: 'https://en.wikipedia.org/wiki/Charles_Quansah'
    },
    {
        name: 'Ottis Toole',
        address: 'https://en.wikipedia.org/wiki/Ottis_Toole'
    },
    {
        name: 'Wayne Williams',
        address: 'https://en.wikipedia.org/wiki/Wayne_Williams'
    },
    {
        name: 'Kieran Patrick Kelly',
        address: 'https://en.wikipedia.org/wiki/Kieran_Patrick_Kelly'
    },
    {
        name: 'Allan Grimson',
        address: 'https://en.wikipedia.org/wiki/Allan_Grimson'
    },
    {
        name: 'Billy Edwin Reid',
        address: 'https://en.wikipedia.org/wiki/Billy_Edwin_Reid'
    },
    {
        name: 'Joe Ball',
        address: 'https://en.wikipedia.org/wiki/Joe_Ball'
    },
    {
        name: 'Jessie McTavish',
        address: 'https://en.wikipedia.org/wiki/Jessie_McTavish'
    },
    {
        name: 'Abdul Latif Sharif',
        address: 'https://en.wikipedia.org/wiki/Abdul_Latif_Sharif'
    },
    {
        name: 'Daisuke Mori',
        address: 'https://en.wikipedia.org/wiki/Daisuke_Mori'
    },
    {
        name: 'Bevan Spencer von Einem',
        address: 'https://en.wikipedia.org/wiki/Bevan_Spencer_von_Einem'
    },
    {
        name: 'Edgar Matobato',
        address: 'https://en.wikipedia.org/wiki/Edgar_Matobato'
    },
    {
        name: 'John Bodkin Adams',
        address: 'https://en.wikipedia.org/wiki/John_Bodkin_Adams'
    },
    {
        name: 'The Man from the Train',
        address: 'https://en.wikipedia.org/wiki/The_Man_from_the_Train'
    },
    {
        name: 'David Parker Ray',
        address: 'https://en.wikipedia.org/wiki/David_Parker_Ray'
    }
]

const articles = []

killers.forEach(killer => {
    axios.get(killer.address)
        .then(response => {

            const html = response.data
            const $ = cheerio.load(html)

            $('table.biography > tbody', html).each(function () {

                const protocol = 'https:'
                const imgFilePath = $('td > a > img').attr('src')
                const img = protocol + imgFilePath

                // Dealing with <br>
                $('table.biography > tbody > tr > td br').replaceWith(', ')

                // Dealing with Inline References 
                $('table.biography > tbody > tr > td sup').replaceWith('')

                // Data from tables
                const born = $('tr:contains("Born")').children('td.infobox-data').text()
                const died = $('tr:contains("Died")').children('td.infobox-data').text()
                const death = $('tr:contains("death")').children('td.infobox-data').text()
                const nicknames = $('tr:contains("names")').children('td.infobox-data').text()
                const spouse = $('tr:contains("Spouse(s)")').children('td.infobox-data').text()
                const height = $('tr:contains("Height")').children('td.infobox-data').text()
                const penalty = $('tr:contains("Penalty")').children('td.infobox-data').text()
                const charges = $('tr:contains("penalty")').children('td.infobox-data').text()
                const methods = $('tr:contains("Conviction(s)")').children('td.infobox-data').text()
                const convictions = $('tr:contains("Conviction(s)")').children('td.infobox-data ul li a').text()
                const motive = $('tr:contains("Motive")').children('td.infobox-data').text()
                const victims = $('tr:contains("Victims")').children('td.infobox-data').text()
                const active = $('tr:contains("crimes")').children('td.infobox-data').text()
                const country = $('tr:contains("Country")').children('td.infobox-data').text()
                const states = $('tr:contains("State(s)")').children('td.infobox-data').text()
                const apprehended = $('tr:contains("apprehended")').children('td.infobox-data').text()
                const escaped = $('tr:contains("Escaped")').children('td.infobox-data').text()
                const imprisoned = $('tr:contains("Imprisoned")').children('td.infobox-data').text()
                //const about = $('p').text()

                const preCleanScrapedData = {
                    name: killer.name,
                    photo: img,
                    born,
                    died,
                    death,
                    nicknames,
                    spouse,
                    height,
                    'criminal penalty': penalty,
                    'charged with': charges,
                    'method(s)': methods,
                    'conviction(s)': convictions,
                    motive,
                    victims,
                    active,
                    country,
                    'state(s)': states,
                    apprehended,
                    escaped,
                    imprisoned,
                    //about,
                    source: killer.address
                }

                // Remove empty or null
                const removeEmptyOrNull = (obj) => {
                    Object.keys(obj).forEach(k =>
                        (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
                        (!obj[k] && obj[k] !== undefined) && delete obj[k]
                    )
                    return obj
                }

                const scrapedData = removeEmptyOrNull(preCleanScrapedData)

                articles.push(scrapedData)
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
