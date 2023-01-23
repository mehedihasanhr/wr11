import * as React from 'react';
import Label from './Form/Label';
import Input from './Form/Input';
import SubmitButton from './Form/SubmitButton';
import axios from '../axios';

function SectorSelectorForm({ data }) {

    const [name, setName] = React.useState('');
    const [sectors, setSectors] = React.useState([]);
    const [term, setterm] = React.useState(false);
    const [errors, setErrors] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    console.log(name, sectors, term)

    React.useEffect(() => {
        if (data) {
            setName(data.name);
            setSectors([...data.sectors]);
            setterm(data.term);
            console.log("edit mode")
        }
    }, [data]);



    // handle sectors change
    const handleSectorsChange = (e) => {
        e.preventDefault();

        const { options } = e.target;
        const value = [];

        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setSectors(value);
    }



    // validate form
    const validateForm = () => {
        if (name === '') {
            setErrors('Name is required');
            return false;
        }

        if (sectors.length === 0) {
            setErrors('Sectors are required');
            return false;
        }

        if (!term) {
            setErrors('You must agree to the term and conditions');
            return false;
        }

        return true;

    }

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name,
            sectors,
            term
        }



        if (validateForm()) {
            setLoading(true);
            axios.post("/sector", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(res => {
                console.log(res.data);
                setLoading(false);
            })
        }

    }


    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = {
            name,
            sectors,
            term
        }


        if (validateForm()) {
            setLoading(true);
            axios.post(`/sector/${data._id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(res => {
                console.log(res.data);
                setLoading(false);
            })
        }
    }


    return (
        <div className="App">
            <div className='form__wrapper'>
                <form className='form'>
                    <p className='form_message'>
                        Please enter your name and pick the Sectors you are currently involved in.
                    </p>
                    <Label title="Name" htmlFor="name">
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Label>


                    <Label title="Sectors" htmlFor="sectors">
                        <>
                            <select multiple={true}
                                value={sectors}
                                size="10" onChange={handleSectorsChange} className="form__select">
                                <option value="1"># Manufacturing</option>
                                <option value="19" >&nbsp;&nbsp;&nbsp;&nbsp;- Construction materials</option>
                                <option value="18">&nbsp;&nbsp;&nbsp;&nbsp;- Electronics and Optics</option>
                                <option value="6">&nbsp;&nbsp;&nbsp;&nbsp;- Food and Beverage</option>
                                <option value="342">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Bakery &amp; confectionery products</option>
                                <option value="43">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Beverages</option>
                                <option value="42">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Fish &amp; fish products </option>
                                <option value="40">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Meat &amp; meat products</option>
                                <option value="39">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Milk &amp; dairy products </option>
                                <option value="437">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Other</option>
                                <option value="378">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Sweets &amp; snack food</option>
                                <option value="13">&nbsp;&nbsp;&nbsp;&nbsp;- Furniture</option>
                                <option value="389">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Bathroom/sauna </option>
                                <option value="385">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Bedroom</option>
                                <option value="390">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Children’s room </option>
                                <option value="98">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Kitchen </option>
                                <option value="101">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Living room </option>
                                <option value="392">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Office</option>
                                <option value="394">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Other (Furniture)</option>
                                <option value="341">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Outdoor </option>
                                <option value="99">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Project furniture</option>
                                <option value="12">&nbsp;&nbsp;&nbsp;&nbsp;- Machinery</option>
                                <option value="94">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Machinery components</option>
                                <option value="91">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Machinery equipment/tools</option>
                                <option value="224">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Manufacture of machinery </option>
                                <option value="97">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Maritime</option>
                                <option value="271">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** Aluminium and steel workboats </option>
                                <option value="269">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** Boat/Yacht building</option>
                                <option value="230">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** Ship repair and conversion</option>
                                <option value="93">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal structures</option>
                                <option value="508">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other</option>
                                <option value="227">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Repair and maintenance service</option>
                                <option value="11">&nbsp;&nbsp;&nbsp;&nbsp;- Metalworking</option>
                                <option value="67">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Construction of metal structures</option>
                                <option value="263">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Houses and buildings</option>
                                <option value="267">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Metal products</option>
                                <option value="542">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Metal works</option>
                                <option value="75">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** CNC-machining</option>
                                <option value="62">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** Forgings, Fasteners </option>
                                <option value="69">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** Gas, Plasma, Laser cutting</option>
                                <option value="66">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** MIG, TIG, Aluminum welding</option>
                                <option value="9">&nbsp;&nbsp;&nbsp;&nbsp;- Plastic and Rubber</option>
                                <option value="54">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Packaging</option>
                                <option value="556">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Plastic goods</option>
                                <option value="559">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Plastic processing technology</option>
                                <option value="55">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** Blowing</option>
                                <option value="57">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** Moulding</option>
                                <option value="53">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** Plastics welding and processing</option>
                                <option value="560">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic profiles</option>
                                <option value="5">&nbsp;&nbsp;&nbsp;&nbsp;- Printing </option>
                                <option value="148">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Advertising</option>
                                <option value="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Book/Periodicals printing</option>
                                <option value="145">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Labelling and packaging printing</option>
                                <option value="7">&nbsp;&nbsp;&nbsp;&nbsp;- Textile and Clothing</option>
                                <option value="44">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Clothing</option>
                                <option value="45">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Textile</option>
                                <option value="8">&nbsp;&nbsp;&nbsp;&nbsp;- Wood</option>
                                <option value="337">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Other (Wood)</option>
                                <option value="51">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Wooden building materials</option>
                                <option value="47">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Wooden houses</option>
                                <option value="3"># Other</option>
                                <option value="37">&nbsp;&nbsp;&nbsp;&nbsp;- Creative industries</option>
                                <option value="29">&nbsp;&nbsp;&nbsp;&nbsp;- Energy technology</option>
                                <option value="33">&nbsp;&nbsp;&nbsp;&nbsp;- Environment</option>
                                <option value="2"># Service</option>
                                <option value="25">&nbsp;&nbsp;&nbsp;&nbsp;- Business services</option>
                                <option value="35">&nbsp;&nbsp;&nbsp;&nbsp;- Engineering</option>
                                <option value="28">&nbsp;&nbsp;&nbsp;&nbsp;- Information Technology and Telecommunications</option>
                                <option value="581">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Data processing, Web portals, E-marketing</option>
                                <option value="576">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Programming, Consultancy</option>
                                <option value="121">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Software, Hardware</option>
                                <option value="122">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Telecommunications</option>
                                <option value="22">&nbsp;&nbsp;&nbsp;&nbsp;- Tourism</option>
                                <option value="141">&nbsp;&nbsp;&nbsp;&nbsp;- Translation services</option>
                                <option value="21">&nbsp;&nbsp;&nbsp;&nbsp;- Transport and Logistics</option>
                                <option value="111">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Air</option>
                                <option value="114">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Rail</option>
                                <option value="112">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Road</option>
                                <option value="113">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* Water</option>
                            </select>
                            <span className='form__selcct_msg'>
                                Select multiple categories by holding down the <code> Ctrl</code> key.
                            </span>
                        </>
                    </Label>

                    <div className='term'>
                        <input type="checkbox" checked={term} name="is_active" id="is_active" onChange={e => setterm(e.target.checked)} />
                        <label htmlFor="is_active">Agree to term </label>
                    </div>

                    <div className='error_message'>
                        {errors && <p>{errors}</p>}
                    </div>
                    {data ?
                        <SubmitButton title={`${loading ? 'Uploading' : 'Upload'}`} onClick={handleUpdate} />
                        :
                        <SubmitButton title={`${loading ? 'Saving' : 'Save'}`} onClick={handleSubmit} />}
                </form>
            </div>
        </div>
    );
}

export default SectorSelectorForm;
