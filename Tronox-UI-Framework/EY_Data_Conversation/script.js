// See https://www.npmjs.com/package/generate-schema documentation.
import * as generateSchema from 'https://esm.run/generate-schema';
import lyojsonToPrettyYaml from 'https://cdn.jsdelivr.net/npm/@lyo/json-to-pretty-yaml@1.2.2/+esm'
// import json2xml from 'https://cdn.jsdelivr.net/npm/json2xml@0.1.3/+esm'
// import xml2jsonLight from 'https://cdn.jsdelivr.net/npm/xml2json-light@1.0.6/+esm'
import xmlJs from 'https://cdn.jsdelivr.net/npm/xml-js@1.6.11/+esm'
// import requireJson5 from 'https://cdn.jsdelivr.net/npm/require-json5@1.3.0/+esm'
import JSON5 from 'https://unpkg.com/json5@2/dist/index.min.mjs'
import * as YAML from 'https://unpkg.com/js-yaml@4.1.0/dist/js-yaml.mjs';
import yamljs from 'https://cdn.jsdelivr.net/npm/yamljs@0.3.0/+esm'
import * as XLSX from 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm';


import {validJson, validXml} from "./sub_script.js/json_validation.js";

localStorage.setItem("key", "1a2b3c4d5e")

if(localStorage.getItem("key")!==localStorage.getItem("value")){
    const key = prompt('Please enter your secret key')
    if(key!==localStorage.getItem("key")){
        alert("Invalid Secret Key")
        throw new Error("Invalid Secret Key")
    }
    localStorage.setItem("value", key)
}




// Select elements
const responseTextarea = document.querySelector('#response-textarea');
const convertedSchemaContainer = document.querySelector('#converted-schema-container');
const convertButton = document.querySelector('.decorated-button');
const clearResponseButton = document.querySelector('.clear-response');
const clearSchemaButton = document.querySelector('.clear-schema');
const icon_copy_container = document.querySelector('.icon-copy-container');
const icon_copy = document.querySelector('.copy');
const icon_copy_check = document.querySelector('.copied');
const file = document.querySelector('#fileInput')
const icon_copy_text = document.querySelector('#icon-copy')
const side_bar_container = document.querySelector('.side-bar ')
const side_bar = document.querySelectorAll('.side-bar p');
const validation_container = document.querySelector("#invalid-container")
const validation_container_remove = document.querySelector("#invalid-container .fa-square-xmark")
const invalid_text = document.querySelector(".invalid-container-first .invalid-text")


let toSchema = ""
let main_box_header = document.querySelector(".main-box-header")
let convert_box_header = document.querySelector(".convert-box-header")

let error_message

// side_bar.forEach((element) => {
//     element.addEventListener('click', () => {
//         // Check if the clicked element already has the active class
//         const isActive = element.classList.contains('side-bar-active');
        
//         // Remove the active class from all elements
//         side_bar.forEach(el => el.classList.remove('side-bar-active'));
        
//         // If the clicked element was not active, add the active class to it
//         if (!isActive) {
//             element.classList.add('side-bar-active');
//         }
//     });
// });

side_bar.forEach((element) => {
    element.addEventListener('click', () => {
        main_box_header.innerText=""
        convert_box_header.innerText=""
        // Remove the active class from all elements
        side_bar.forEach(el => el.classList.remove('side-bar-active'));
        element.classList.add('side-bar-active'); 
        toSchema = element.getAttribute("id")
        console.log(toSchema.split("-").join(""));
        
        switch(toSchema) {
            case "To-Json-Schema":
                main_box_header.innerText = "JSON"
                convert_box_header.innerText = "JSON Schema" 
                break;
            case "to-Yaml":
                main_box_header.innerText = "JSON"
                convert_box_header.innerText = "YAML" 
                break;
            case "to-XML":
                main_box_header.innerText = "JSON"
                convert_box_header.innerText = "XML" 
                break;
            case "to-Js":
                main_box_header.innerText = "JSON"
                convert_box_header.innerText = "JavaScript Object"  
                break;
            case "js-to-json":
                main_box_header.innerText = "JS Object"
                convert_box_header.innerText = "JSON" 
                break;
            case "JS-Object-To-Json-Schema":
                main_box_header.innerText = "JS Object"
                convert_box_header.innerText = "JSON Schema" 
                break;
            case "JS-Object-To-XML":
                main_box_header.innerText = "JS Object"
                convert_box_header.innerText = "XML" 
                break;
            case "JS-Object-To-YAML":
                main_box_header.innerText = "JS Object"
                convert_box_header.innerText = "YAML"
                break;
            case "XML-to-JSON":
                main_box_header.innerText = "XML"
                convert_box_header.innerText = "JSON" 
                break;
            case "XML-to-YAML":
                main_box_header.innerText = "XML"
                convert_box_header.innerText = "YAML" 
                break;
            case "YAML-to-JSON":
                main_box_header.innerText = "YAML"
                convert_box_header.innerText = "JSON" 
                break;
            case "YAML-to-XML":
                main_box_header.innerText = "YAML"
                convert_box_header.innerText = "XML" 
                break;
            case "XLSX-to-JSON":
                main_box_header.innerText = "XLSX"
                convert_box_header.innerText = "JSON" 
                break;
        }
        console.log(toSchema);
        side_bar_container.style.height = "575px"
        
    });
});



let data
let file_name

const invalid = (result, text)=>{
    if(!result){
        validation_container.style.display = "block";
        invalid_text.innerText = text
        setTimeout(()=>{
            validation_container.classList.add('remove-invalid-container')
            file.value = ""
        }, 10000)
        setTimeout(()=>{
            validation_container.style.display = "none";
            invalid_text.innerText = ""
            validation_container.classList.remove('remove-invalid-container')
        }, 11000)
    }
}

validation_container_remove.addEventListener("click", ()=>{
    validation_container.classList.add('remove-invalid-container')
    setTimeout(()=>{
        validation_container.style.display = "none";
        validation_container.classList.remove('remove-invalid-container')
    }, 1000)
})


//sidebar actions

//file upload

file.addEventListener('change', function(event) {
    
    
    var file = this.files[0];
    console.log(file);
    file_name = file.name.split(".").slice(0, -1).join("");
    console.log(file_name+"_converted");
    
    
    
    var reader = new FileReader();
    if (file.name.endsWith('.json')) {
        console.log("json");
        reader.onload = function(e) {
            const valid_result = validJson(e.target.result, "Request")
            invalid(valid_result, "Invalid Json Format")
            const jsonContent = JSON.stringify(JSON.parse(e.target.result), null, 4);
            responseTextarea.value = jsonContent;
        };
        reader.readAsText(file);
    }else if(file.name.endsWith('.xlsx')){
        console.log("excel");
        
        reader.onload = function(e) {
            
            data = new Uint8Array(e.target.result);
            responseTextarea.value = data;
        };
        reader.readAsArrayBuffer(file); // Read Excel as ArrayBuffer
            
    }else if(file.name.endsWith('.yaml')){
        console.log("yaml");
        reader.onload = function(event) {
            var text = event.target.result;
            try {
                YAML.load(text);
                console.log("validated yaml");
            } catch (error) {
                invalid(false, "Invalid Yaml Format")
                console.error("Invalid YAML", error);
                return;
            }
            responseTextarea.value = text;
        };
        reader.readAsText(file);
    }else if(file.name.endsWith('.xml')){
        reader.onload = function(event) {
            var text = event.target.result;
            // const valid_result = validXml(text, "Request")
            // invalid(valid_result, "Invalid XML")
            try {
                const s=xmlJs.xml2json(text);
            } catch (error) {
                invalid(false, "Invalid XML Format")
                throw new Error(error)
                
            }
            
            
            responseTextarea.value = text;
        };

        reader.readAsText(file);
    }
    else if(file.name.endsWith('.txt')){
        reader.onload = function(event) {
            var text = event.target.result;
            responseTextarea.value = text;
        };

        reader.readAsText(file);
    }else if(file.name.endsWith(".docx")){
        alert("invalid file type")
    }
});




// Handle conversion 

convertButton.addEventListener("click", () => {
    convertedSchemaContainer.style.color = ""
    const responseSchemaValue = responseTextarea.value.trim();
    const toSchemaAction = toSchema.split('-').join('');
    convertedSchemaContainer.style.whiteSpace = "pre-wrap";  // Set white-space for all cases

    if (!responseSchemaValue) {
        convertedSchemaContainer.style.color = "red"
        convertedSchemaContainer.innerText = "Please enter a valid Source or File for conversion.";
        return;
    }

    try {
        switch (toSchemaAction) {
            case "ToJsonSchema":  
                // Parse the JSON input and generate schema
                const parsedResponse = JSON.parse(responseSchemaValue);
                const generatedSchema = generateSchema.json(parsedResponse);
                convertedSchemaContainer.innerText = JSON.stringify(generatedSchema, null, 2);
                validJson(convertedSchemaContainer.innerText, "Response")
                break;

            case "toYaml":
                const parsedYamlResponse = JSON.parse(responseSchemaValue);
                const generatedYaml = lyojsonToPrettyYaml.stringify(parsedYamlResponse);
                convertedSchemaContainer.innerText = generatedYaml;
                break;

            case "toXML":
                const parsedXmlResponse = JSON.parse(responseSchemaValue);
                const wrappedResponse = { root: parsedXmlResponse }; // Wrap JSON in a root element
                const xmlOptions = { compact: true, ignoreComment: true, spaces: 2 };
                const generatedXML = xmlJs.json2xml(wrappedResponse, xmlOptions);
                const xmlWithHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' + generatedXML;
                // validXml(convertedSchemaContainer.innerText, "Response")
                convertedSchemaContainer.innerText = xmlWithHeader;
                break;

            case "toJs":
                const jsonToJs = JSON5.parse(responseSchemaValue);
                console.log(jsonToJs);
                
                // Convert the object to a string format with indentation (optional)
                convertedSchemaContainer.innerText = JSON5.stringify(jsonToJs, null, 2)
                break;

            case "jstojson":
                // Parse as a JavaScript object and convert to JSON
                // const jsObject = eval(`(${responseSchemaValue})`); // Consider changing eval() for security
                const jsObject = JSON5.parse(responseSchemaValue)
                convertedSchemaContainer.innerText = JSON.stringify(jsObject, null, 4);
                validJson(convertedSchemaContainer.innerText, "Response")
                break;

            case "JSObjectToJsonSchema":
                // const jsSchemaObject = eval(`(${responseSchemaValue})`); // Same eval warning
                const jsSchemaObject = JSON5.parse(responseSchemaValue)
                const jsonSchema = generateSchema.json(jsSchemaObject);
                convertedSchemaContainer.innerText = JSON.stringify(jsonSchema, null, 4);
                validJson(convertedSchemaContainer.innerText, "Response")
                break;
            case "JSObjectToXML":
                // const jsSchemaObject = eval(`(${responseSchemaValue})`); // Same eval warning
                const jsObjectXml = JSON5.parse(responseSchemaValue)
                const wrappedResponseJSObjectToXML = { root: jsObjectXml};
                const JSObjectToXMLxmlOptions = { compact: true, ignoreComment: true, spaces: 2 };
                const jsToXml = xmlJs.js2xml(wrappedResponseJSObjectToXML, JSObjectToXMLxmlOptions);
                const JSObjectToXMLxmlWithHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' + jsToXml;
                convertedSchemaContainer.innerText = JSObjectToXMLxmlWithHeader
                break;
                
            case "JSObjectToYAML":
                // const jsSchemaObject = eval(`(${responseSchemaValue})`); // Same eval warning
                const jsObjectYAML = JSON5.parse(responseSchemaValue)
                const jsToYAML = lyojsonToPrettyYaml.stringify(jsObjectYAML);
                convertedSchemaContainer.innerText = jsToYAML;
                break;

            case "XMLtoJSON":
                const xmlOptionsForJson = { compact: true, ignoreComment: true, spaces: 2 };
                const generatedJsonFromXml = xmlJs.xml2json(responseSchemaValue, xmlOptionsForJson);
                convertedSchemaContainer.innerText = generatedJsonFromXml;
                validJson(convertedSchemaContainer.innerText, "Response")
                break;
            case "XMLtoYAML":
                const xmlOptionsForyaml = { compact: true, ignoreComment: true, spaces: 2 };
                const generatedYamlFromXml = xmlJs.xml2js(responseSchemaValue, xmlOptionsForyaml);
                convertedSchemaContainer.innerText = YAML.dump(generatedYamlFromXml);
                break;
            case "YAMLtoJSON":
                const yamlInput = responseSchemaValue;

                let parsedJson
                //// Convert YAML to JSON
                // if(yamlInput.startsWith("{")||yamlInput.startsWith("[")|| yamltoxmlInput.trim().startsWith("<?xml") || yamltoxmlInput.trim().startsWith("<")){
                //    throw new Error("Invalid YAML"); 
                // }else{
                    // parsedJson = YAML.load(yamlInput);
                    parsedJson = yamljs.parse(yamlInput);
                // }

                // Display the parsed JSON
                convertedSchemaContainer.innerText = JSON.stringify(parsedJson, null, 2);
                validJson(convertedSchemaContainer.innerText, "Response")
                break;
            case "YAMLtoXML":
                const yamltoxmlInput = responseSchemaValue;

                let parsedYAMLtoXML
                //// Convert YAML to JSON
                // if(yamltoxmlInput.startsWith("{")||yamltoxmlInput.startsWith("[") || yamltoxmlInput.trim().startsWith("<?xml") || yamltoxmlInput.trim().startsWith("<")){
                //    throw new Error("Invalid YAML"); 
                // }else{
                    // parsedYAMLtoXML = YAML.load(yamltoxmlInput);
                    parsedYAMLtoXML = yamljs.parse(yamltoxmlInput);
                // }
                console.log(parsedYAMLtoXML);
                

                const wrappedResponseYAMLtoXML = { root: parsedYAMLtoXML }; // Wrap JSON in a root element
                const YAMLtoXMLOptions = { compact: true, ignoreComment: true, spaces: 2 };
                const generatedYAMLtoXML = xmlJs.js2xml(wrappedResponseYAMLtoXML, YAMLtoXMLOptions);
                const yAMLToXMLWithHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' +generatedYAMLtoXML;
                convertedSchemaContainer.innerText = yAMLToXMLWithHeader;
                break;
            case "XLSXtoJSON":
                var workbook = XLSX.read(data, { type: 'array' });
                
                var firstSheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[firstSheetName];
                // var excelContent = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                var excelContent = XLSX.utils.sheet_to_json(worksheet);
                
                const value = JSON.stringify(excelContent, null, 4); // Display Excel content as JSON
                const cleanedRawJSON  = value.replace(/\\r\\n/g, ""); 
                const parsedJSON = JSON.parse(cleanedRawJSON); // Parse the cleaned string to JSON object
               for (let i = 0; i < parsedJSON.length; i++){
                 // Iterate through the keys of the first object in the array
                 Object.keys(parsedJSON[i]).forEach((val) => {
                    // Check if the value is a string and starts with '{', indicating it could be a JSON string
                    if (typeof parsedJSON[i][val] === 'string' && parsedJSON[i][val].startsWith('{') && parsedJSON[i][val].endsWith('}')) {
                        try {
                            // Parse the string to JSON and update the value in `s`
                            parsedJSON[i][val] = JSON.parse(parsedJSON[i][val]);
                            console.log("hello world!");
                
                        } catch (error) {
                            // Log any errors in case the string is not valid JSON
                            console.error(`Error parsing value for ${val}:`, error);
                        }
                    }
                });
               }
               convertedSchemaContainer.innerText = JSON.stringify(parsedJSON, null, 4);
               validJson(convertedSchemaContainer.innerText, "Response")
                break;   
            default:
                alert("Please select a valid conversion action.");
                break;
        }
    } catch (error) {
        console.error(`${toSchemaAction} failed:`, error);
        convertedSchemaContainer.style.color = "red";
        convertedSchemaContainer.innerText = `Invalid format for ${toSchemaAction} conversion!`;
        error_message = false
    }
});


//-----------
//download buttons

const download_container = document.querySelector('.download-container')
function downloadFile(file_name, type){
    const filename = file_name;
    const blob = new Blob([convertedSchemaContainer.innerText], { type: type });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);  // Append to body to make sure the link is clickable
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url); // Clean up the created object URL
    document.body.removeChild(a); // Remove the link element from the DOM
}


download_container.addEventListener('click', (event) => {
    const toSchemaAction = toSchema.split('-').join('');

    // let errorMessages = [];

    // // Validate schema action
    // if (!toSchemaAction) {
    //     errorMessages.push("Action is not defined or invalid.");
    // }
    
    // // Check if the action is 'ToJsonSchema'
    // if (toSchemaAction !== "ToJsonSchema") {
    //     errorMessages.push("Invalid action. Please make sure the action is 'ToJsonSchema'.");
    // }
    
    // // Validate schema content
    // if (!convertedSchemaContainer.innerText) {
    //     errorMessages.push("The schema content is empty. Please provide valid schema data.");
    // }
    
    // // Check for any existing errors
    // if (error_message) {
    //     errorMessages.push("Error found: " + error_message);
    // }

    // // If there are any errors, show them in a single alert
    // if (errorMessages.length > 0) {
    //     alert(errorMessages.join('\n'));  // Combine errors with line breaks
    //     return;  // Stop further execution
    // }

    // // If no errors, proceed with the download
    // downloadFile('converted_schema.json', 'application/json');
  

    function handleDownload(fileName, mimeType) {
        if (convertedSchemaContainer.innerText) {
            downloadFile(fileName, mimeType);
        } else {
            alert("Invalid");
        }
    }
    
    switch (toSchemaAction) {
        case "ToJsonSchema":
        case "jstojson":
        case "JSObjectToJsonSchema":
        case "XMLtoJSON":
        case "YAMLtoJSON":
        case "XLSXtoJSON":
            if(file_name){
                handleDownload(file_name+".json", 'application/json');
            }
            handleDownload('converted_json.json', 'application/json');
            break;
    
        case "toYaml":
        case "JSObjectToYAML":
        case "XMLtoYAML":
            if(file_name){
                handleDownload(file_name+".yaml", 'application/yaml');
            }
            handleDownload('converted_yaml.yaml', 'application/yaml');
            break;
    
        case "toXML":
        case "JSObjectToXML":
        case "YAMLtoXML":
            if(file_name){
                handleDownload(file_name+".xml", 'application/xml');
            }
            handleDownload('converted_xml.xml', 'application/xml');
            break;
    
        default:
            alert("Invalid action");
            break;
    }
    
     
})







// Handle clearing the response
clearResponseButton.addEventListener("click", () => {
     
    // Clear the textarea content
    responseTextarea.value = ''; 
    
    // Reset the file input
    file.value = ''; 
});

clearSchemaButton.addEventListener("click", () => {
    convertedSchemaContainer.innerText = ''; // Clear the converted schema container
});

icon_copy_container.addEventListener("click", async() => {
    try {
        if (convertedSchemaContainer.innerText === '') {
            throw new Error('No schema to copy.');
        }
        await navigator.clipboard.writeText(convertedSchemaContainer.innerText);
        icon_copy.style.display = 'none';
        icon_copy_check.style.display = 'block';
        icon_copy_text.innerText = "Copied!"
        setTimeout(()=>{
            icon_copy.style.display = 'block';
            icon_copy_check.style.display = 'none';
            icon_copy_text.innerText = "Copy"
        }, 3000);
        // alert('Copied the text: ' + convertedSchemaContainer.innerText);
    } catch (err) {
        alert('Failed to copy text: ' + err);
    }
});








//----------------------------------------------------------------------------------------------------------------------------------------------------------------





// convertButton.addEventListener("click", () => {
//     let toSchemaAction = toSchema.split('-').join('')
//     console.log(toSchemaAction);
    
//     if(toSchemaAction === "ToJsonSchema"){
//             const responseSchemaValue = responseTextarea.value.trim();
//             if (responseSchemaValue) {
//                 try {
//                     // Parse the JSON input
//                     const parsedResponse = JSON.parse(responseSchemaValue);
        
//                     // Generate schema from the parsed response
//                     const generatedSchema = generateSchema.json(parsedResponse);
        
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Display the generated schema in the container
//                     convertedSchemaContainer.innerText = JSON.stringify(generatedSchema, null, 2);
//                 } catch (error) {
//                     console.error("Invalid JSON:", error);
//                     convertedSchemaContainer.innerText = "Invalid JSON format!";
//                 }
//             } else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JSON response.";
//             }
//     }else if(toSchemaAction === "toYaml"){
//             const responseSchemaValue = responseTextarea.value.trim();
        
//             if (responseSchemaValue) {
//                 try {
//                     // Parse the JSON input
//                     const parsedResponse = JSON.parse(responseSchemaValue);
        
//                     // Generate schema from the parsed response
//                     const generatedYaml = lyojsonToPrettyYaml.stringify(parsedResponse);
        
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Display the generated schema in the container
//                     convertedSchemaContainer.innerText = generatedYaml
//                 } catch (error) {
//                     console.error("Invalid JSON:", error);
//                     convertedSchemaContainer.innerText = "Invalid JSON format!";
//                 }
//             } else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JSON response.";
//             }
//     }else if(toSchemaAction === "toXML"){
//             const responseSchemaValue = responseTextarea.value.trim();
        
//             if (responseSchemaValue) {
//                 try {
//                    // Parse the JSON input
//                     const parsedResponse = JSON.parse(responseSchemaValue);
                    
//                     // Wrap JSON in a root element if not already present
//                     const wrappedResponse = { root: parsedResponse };
                    
//                     // Define options for XML conversion
//                     const options = { compact: true, ignoreComment: true, spaces: 2 };
                    
//                     // Convert JSON to XML
//                     const generatedXML = xmlJs.json2xml(wrappedResponse, options);
                    
//                     // Prepend XML declaration
//                     const xmlWithHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' + generatedXML;
        
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Display the generated XML in the container
//                     convertedSchemaContainer.innerText = xmlWithHeader;
//                 } catch (error) {
//                     console.error("Invalid JSON:", error);
//                     convertedSchemaContainer.innerText = "Invalid JSON format!";
//                 }
//             } else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JSON response.";
//             }
//         }else if(toSchemaAction === "jstojson"){
//             const responseSchemaValue = responseTextarea.value.trim();
//             if(responseSchemaValue){
//                 try {
//                      // Parse the input as a JavaScript object
//                     const jsObject = eval(`(${responseSchemaValue})`);
    
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Convert JS object to JSON string and display it in the container
//                     convertedSchemaContainer.innerText = JSON.stringify(jsObject, null, 4);
                    
//                 } catch (error) {
//                     console.error("Invalid JS Object:", error);
//                     convertedSchemaContainer.innerText = "Invalid JS Object format!";
//                 }
//             }else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JS Object response.";
//             }
//         }else if(toSchemaAction === "JSObjectToJsonSchema"){
//             const responseSchemaValue = responseTextarea.value.trim();
//             if(responseSchemaValue){
//                 try {
//                      // Parse the input as a JavaScript object
//                     const jsObject = eval(`(${responseSchemaValue})`);
    
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Convert JS object to JSON string and display it in the container
//                     const json = generateSchema.json(jsObject)
//                     convertedSchemaContainer.innerText = JSON.stringify(json, null, 4);
                    
//                 } catch (error) {
//                     console.error("Invalid JS Object:", error);
//                     convertedSchemaContainer.innerText = "Invalid JS Object format!";
//                 }
//             }else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JS Object response.";
//             }
//         }else if(toSchemaAction === "XMLtoJSON"){
       
//             const responseSchemaValue = responseTextarea.value.trim();
        
//             if (responseSchemaValue) {
//                 try {
                    
//                     const options = { compact: true, ignoreComment: true, spaces: 2 };
//                     const generatedJsonFromXml = xmlJs.xml2json(responseSchemaValue, options);
        
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Display the generated schema in the container
//                     convertedSchemaContainer.innerText = generatedJsonFromXml
//                 } catch (error) {
//                     console.error("Invalid JSON:", error);
//                     convertedSchemaContainer.innerText = "Invalid XML format!";
//                 }
//             } else {
//                 convertedSchemaContainer.innerText = "Please enter a valid XML response.";
//             }
//     }
//     else{
//         alert("Please select a valid conversion action.");
//     }
// });



// switch (toSchemaAction) {
//     case "ToJsonSchema":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_schema_from_json.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "toYaml":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_yaml.yaml', 'application/yaml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "toXML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_xml.xml', 'application/xml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "jstojson":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_json.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "JSObjectToJsonSchema":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_schema.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "JSObjectToXML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_xml.xml', 'application/xml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "JSObjectToYAML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_yaml.yaml', 'application/yaml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "XMLtoJSON":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_json.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "XMLtoYAML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_yaml.yaml', 'application/yaml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "YAMLtoJSON":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_json.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "YAMLtoXML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_xml.xml', 'application/xml');
//         } else {
//             alert("Invalid");
//         }
//         break;
    

//     default:
//         alert("Invalid action");
//         break;
// }
