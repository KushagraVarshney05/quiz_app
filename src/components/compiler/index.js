import React, { useState } from 'react';
import "./styles.css";
import axios from 'axios';

const Index = () => {
    const [formData, setFormData] = useState({
        code: '',
        input: '',
        lang: 'C',
        inputRadio: 'false'
    });
    const [output, setOutput] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("hello");
        console.log(formData);

        // Make the API call
        axios.post('http://localhost:8080/compilecode', formData)
            .then(response => {
                // Handle the API response
                console.log(response.data);
                setOutput(response.data.output);

            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            });
    };

    return (
        <div>
            <h1>Compiler</h1>
            <form id="myform" name="myform" method="post" onSubmit={handleSubmit}>
                <h3>Code</h3>
                <textarea rows="13" cols="100" id="code" name="code" value={formData.code} onChange={handleChange}></textarea>
                <br />
                <h3>Output</h3>
                <h2 className='output'>{output}</h2>
                <br />
                Language :
                <select name="lang" value={formData.lang} onChange={handleChange}>
                    <option value="C">C</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                </select>
                {/* Compile With Input :
                <input type="radio" name="inputRadio" id="inputRadio" value="true" checked={formData.inputRadio === 'true'} onChange={handleChange} />yes
                <input type="radio" name="inputRadio" id="inputRadio" value="false" checked={formData.inputRadio === 'false'} onChange={handleChange} />No
                <br /> */}
                <input type="submit" value="submit" name="submit" />
            </form>
        </div>
    );
};

export default Index;
