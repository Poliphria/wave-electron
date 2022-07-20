exports.convertSeconds = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
    // format as MM:SS
    const result = `${minutes}:${padTo2Digits(seconds)}`;
    return result
}