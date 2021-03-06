const axios = require('axios')
const parser = require('fast-xml-parser')

const getGoodreadsUrl = (shelfName) => {
  const key = process.env.GOODREADS_KEY
  const uid = process.env.USERID
  return `https://www.goodreads.com/review/list.xml?key=${key}&v=2&id=${uid}&shelf=${shelfName}&sort=date_added&order=d`
}

const getBooksFromShelf = async (shelf) => {
  const options = {
        attributeNamePrefix : "@_",
        attrNodeName: "attr", //default is 'false'
        textNodeName : "#text",
        ignoreAttributes : true,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
        localeRange: "", //To support non english character in tag/attribute values.
        parseTrueNumberOnly: false,
    };


  const xml = await axios.get(getGoodreadsUrl(shelf));
  const data = xml.data;

  if(parser.validate(data) === true) { //optional (it'll return an object in case it's not valid)
    return parser.parse(data)
  }
  return {}
}

module.exports = {
  getCurrentlyReading: () => getBooksFromShelf('currently-reading'),
  getFavoriteBooks: () => getBooksFromShelf('favorites')
}
