export default function Input({value, setValue, readonly, output='span', ...props}) {
    const Output = output

    function handleOnChange(event) {
        if (setValue) {
            setValue(event.target.value)
        }
    }

    if (!readonly) {
        return <input type="text" {...props} value={value} onChange={handleOnChange} />
    }
    return <Output {...props}>{value}</Output>
}