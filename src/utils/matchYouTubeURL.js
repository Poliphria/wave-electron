exports.matchYouTubeURL = (url) => {
    let link = url.match(this.youTubeRegex)
    if (link) {
        return true;
    }
    return false;
}

exports.getYouTubeID = (url) => {
    if (this.matchYouTubeURL(url)) {
        let link = url.match(this.youTubeRegex)[1]
        return link
    } else {
        return Error('Invalid URL')
    }
}

exports.youTubeRegex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;