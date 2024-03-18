export default function IO({value, setValue, isEditing, output='span', ...props}) {
    const Output = output

    function handleOnChange(event) {
        if (setValue) {
            setValue(event.target.value)
        }
    }

    if (isEditing) {
        return <input type="text" {...props} value={value} onChange={handleOnChange} />
    }
    return <Output {...props}>{value}</Output>
}