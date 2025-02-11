// import fastXmlParser from 'https://cdn.jsdelivr.net/npm/fast-xml-parser@4.5.0/+esm'

const validJson = (value, name)=>{
    try {
        // Validate the JSON
        jsonlint.parse(value);
        console.log(`${name} JSON is valid.`);
        return true;
      } catch (error) {
        // alert("invalid Json type")
        return false;
      }
}
const validXml = (validXmlString, name) => {
    try {
        // Validate the XML using xmllint
        const result = xmllint.validateXML({ xml: validXmlString });
        console.log(result);
        
        if(result.errors.length > 0){
          throw new Error(result.errors);
        }
        
        console.log(`${name} xml is valid.`);

      //        if (fastXmlParser.validate(validXmlString) === true) {
      //     console.log("XML is valid.");
      // } else {
      //     console.log("XML is invalid.");
      // }
    } catch (error) {
        return false;
    }
};

export {validJson, validXml}

