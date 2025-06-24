export function formatDate(dateString) {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Invalid Date";
    const dateLayout = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, dateLayout)
}