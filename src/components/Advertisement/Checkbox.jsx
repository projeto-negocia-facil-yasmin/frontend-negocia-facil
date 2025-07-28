export function Checkbox({ label, checked, onChange }) {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
    );
}
