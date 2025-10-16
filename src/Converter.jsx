import React, { useState } from "react";
import styles from "./Converter.module.css";

function Converter() {
  const [jsonData, setJsonData] = useState("");
  const [xmlData, setXmlData] = useState("");
  const [error, setError] = useState(null);

  function jsonToXml(json) {
    try {
      const parsedJson = JSON.parse(json);
      const xmlDoc = document.implementation.createDocument("", "", null);
      const rootElement = xmlDoc.createElement("root");
      xmlDoc.appendChild(rootElement);

      function buildXml(node, data) {
        if (Array.isArray(data)) {
          data.forEach((item) => {
            // For array items, create a generic 'item' element
            // or handle based on the key of the array if needed.
            let element = xmlDoc.createElement("item");
            buildXml(element, item);
            node.appendChild(element);
          });
        } else if (typeof data === "object" && data !== null) {
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              let element = xmlDoc.createElement(key);
              buildXml(element, data[key]);
              node.appendChild(element);
            }
          }
        } else {
          node.textContent = data;
        }
      }

      buildXml(rootElement, parsedJson);
      // Use 'prettify' logic for formatted output
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(xmlDoc);
      const formattedXml = formatXml(xmlString);
      return formattedXml;

    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON format. Please check your input.");
      } else {
        setError("Error converting JSON to XML: " + err.message);
      }
      return "";
    }
  }

  function formatXml(xml) {
    let formatted = '';
    let reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    let pad = 0;
    xml.split('\r\n').forEach(function(node) {
        let indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        let padding = '';
        for (let i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
  }


  function handleConvert() {
    setError(null);
    if (!jsonData) {
        setXmlData("");
        return;
    }
    const xml = jsonToXml(jsonData);
    setXmlData(xml);
  }

  return (
    <div className={styles["converter-body"]}>
      <h1 className={styles.header}>JSON to XML Conversion</h1>
      <textarea
        className={styles["textarea"]}
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder='Enter JSON here... e.g., {"name":"Alex","destinations":["Paris","London"]}'
      ></textarea>
      <button className={styles.btn} onClick={handleConvert}>
        Convert to XML
      </button>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.output}>
          <pre>{xmlData}</pre>
        </div>
      )}
    </div>
  );
}

export default Converter;