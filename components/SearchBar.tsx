export default function SearchBar() {
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>
                Text input: <input name="myInput" defaultValue="Some initial value" />
            </label>
            <button type="reset">Reset form</button>
            <button type="submit">Submit form</button>
        </form>
    );
}