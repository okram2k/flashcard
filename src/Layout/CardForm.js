import React from "react";

const CardForm = ({formData, handleChange}) => {

return (
    <div>
        <label>
            Front:
        </label> <br />
            <textarea
            id="front"
            type="text"
            name="front"
            rows="3"
            onChange={handleChange}
            value={formData.front}
            style={{ width: "100%" }}
            />
        <br />
        <br />
        <label>
            Back:
        </label> <br />
            <textarea
            id="back"
            type="textarea"
            name="back"
            rows="3"
            onChange={handleChange}
            value={formData.back}
            style={{ width: "100%" }}
            />
        </div>
    )
};
export default CardForm;