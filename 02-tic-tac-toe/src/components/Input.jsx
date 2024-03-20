export default function Input({value, readonly, output='span', ...props}) {
    const Output = output

    if (!readonly) {
        return <input type="text" value={value} {...props} />
    }
    return <Output {...props}>{value}</Output>
}