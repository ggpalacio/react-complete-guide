export default function UserInput({value, onChange}) {
    function handleChange(field, value) {
        onChange(field, value)
    }

    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label>Initial Investment</label>
                    <input
                        type="number"
                        required
                        value={value.initialInvestment}
                        onChange={(event) => handleChange('initialInvestment', event.target.value)}
                    />
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input
                        type="number"
                        required
                        value={value.annualInvestment}
                        onChange={(event) => handleChange('annualInvestment', event.target.value)}
                    />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label>Expected Return</label>
                    <input
                        type="number"
                        required
                        value={value.expectedReturn}
                        onChange={(event) => handleChange('expectedReturn', event.target.value)}
                    />
                </p>
                <p>
                    <label>Duration</label>
                    <input
                        type="number"
                        required
                        value={value.duration}
                        onChange={(event) => handleChange('duration', event.target.value)}
                    />
                </p>
            </div>
        </section>
    )
}