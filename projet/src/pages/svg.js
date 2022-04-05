function svg(margin, width, height) {
    const body = d3.select("body");
    body.append("svg");

    const svg = d3.select("svg");

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "group")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const g = d3.select(".group");
}

export default svg