
export const dateFormat = () => {
    const date = new Date();
    return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute:'2-digit'
    });
}