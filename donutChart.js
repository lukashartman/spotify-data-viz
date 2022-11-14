let rawDonutSpotifyData = [];

let donutChartRatios = undefined;

const donutDimension = d3.select('svg');
const donutSvgWidth = +donutDimension.style('width').replace('px','');
const donutSvgHeight = +donutDimension.style('height').replace('px','');

const donutMargin = { top:50, bottom: 50, right: 50, left: 50 };
const donutInnerWidth = donutSvgWidth - donutMargin.left - donutMargin.right;
const donutInnerHeight = donutSvgHeight - donutMargin.top - donutMargin.bottom;

const animationSpeed = 500;

// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {

    // This will load your two CSV files and store them into two arrays.
    Promise.all([d3.csv('data/songs_normalize.csv')])
        .then(function (values) {
            rawDonutSpotifyData = values[0];

            let numOfSongsWithOneGenre = 0, numOfSongsWithTwoGenre = 0, numOfSongsWithThreeGenre = 0,
                numOfSongsWithFourGenre = 0;
            rawDonutSpotifyData.forEach(song =>{
                let numOfCommas = (song['genre'].split(",").length - 1)
                switch (numOfCommas){
                    case 0:
                        numOfSongsWithOneGenre++;
                        break;
                    case 1:
                        numOfSongsWithTwoGenre++;
                        break;
                    case 2:
                        numOfSongsWithThreeGenre++;
                        break;
                    case 3:
                        numOfSongsWithFourGenre++;
                        break;
                }
            })

            donutChartRatios = {
                ['One Genre']: numOfSongsWithOneGenre,
                ['Two Genres']: numOfSongsWithTwoGenre,
                ['Three Genres']: numOfSongsWithThreeGenre,
                ['Four Genres']: numOfSongsWithFourGenre
            }

            makeDonutWaypoints();


        });
});

function makeDonutWaypoints(){
    new Waypoint({
        element: document.getElementById('donutChartStep1'),
        handler: function(direction) {
            if(direction === 'down'){
                step1Down()
            } else {
                step1Up()
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('donutChartStep2'),
        handler: function(direction) {
            if(direction === 'down'){
                step2Down()
            } else {
                step2Up()

            }

        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('donutChartStep3'),
        handler: function(direction) {
            if(direction === 'down'){
                step3Down()
            } else {
                step3Up()

            }

        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('donutChartStep4'),
        handler: function(direction) {
            if(direction === 'down'){
                step4Down()
            } else {
                step4Up()

            }

        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('donutChartSvg'),
        handler: function(direction) {
            if(direction === 'down'){
                d3.select('#donutChartSvg').classed('isFixed', true)
            } else {
                d3.select('#donutChartSvg').classed('isFixed', false)
            }

        },
        offset: 100
    });
}

function step1Down(){
    let svg = d3.select("#donutChartSvg").html("");

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet3)

    const pie = d3.pie().value(function(d) {return d[1]});

    let paths = svg
        .append('g')
        .attr('transform', 'translate(' + donutInnerWidth/2 +  ',' + donutInnerHeight/2 +')')
        .selectAll('path')
        .data(pie(Object.entries(donutChartRatios)))
        .enter()
        .append("path")
        .attr('fill', (d) => color(d.value))

    let angleInterpolation = d3.interpolate(0, 2.7);

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150);

    paths.transition()
        .duration(animationSpeed)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });
}

function step2Down(){
    let svg = d3.select("#donutChartSvg").html("");

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet3)

    const pie = d3.pie().value(function(d) {return d[1]});

    let paths = svg
        .append('g')
        .attr('transform', 'translate(' + donutInnerWidth/2 +  ',' + donutInnerHeight/2 +')')
        .selectAll('path')
        .data(pie(Object.entries(donutChartRatios)))
        .enter()
        .append("path")
        .attr('fill', (d) => color(d.value))


    let angleInterpolation = d3.interpolate(2.7, 4.973);

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150);

    paths.transition()
        .duration(animationSpeed)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });
}

function step3Down(){
    let svg = d3.select("#donutChartSvg").html("");

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet3)

    const pie = d3.pie().value(function(d) {return d[1]});

    let paths = svg
        .append('g')
        .attr('transform', 'translate(' + donutInnerWidth/2 +  ',' + donutInnerHeight/2 +')')
        .selectAll('path')
        .data(pie(Object.entries(donutChartRatios)))
        .enter()
        .append("path")
        .attr('fill', (d) => color(d.value))

    let angleInterpolation = d3.interpolate(4.973, 6.25);

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150);

    paths.transition()
        .duration(animationSpeed)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });
}

function step4Down(){
    let svg = d3.select("#donutChartSvg").html("");

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet3)

    const pie = d3.pie().value(function(d) {return d[1]});

    let paths = svg
        .append('g')
        .attr('transform', 'translate(' + donutInnerWidth/2 +  ',' + donutInnerHeight/2 +')')
        .selectAll('path')
        .data(pie(Object.entries(donutChartRatios)))
        .enter()
        .append("path")
        .attr('fill', (d) => color(d.value))

    let angleInterpolation = d3.interpolate(6.25, 6.28319);

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150);

    paths.transition()
        .duration(animationSpeed)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });
}

function step1Up(){
    let svg = d3.select("#donutChartSvg").html("");

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet3)

    const pie = d3.pie().value(function(d) {return d[1]});

    let paths = svg
        .append('g')
        .attr('transform', 'translate(' + donutInnerWidth/2 +  ',' + donutInnerHeight/2 +')')
        .selectAll('path')
        .data(pie(Object.entries(donutChartRatios)))
        .enter()
        .append("path")
        .attr('fill', (d) => color(d.value))


    let angleInterpolation = d3.interpolate(2.7, 0);

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150);

    paths.transition()
        .duration(animationSpeed)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });
}

function step2Up(){
    let svg = d3.select("#donutChartSvg").html("");

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet3)

    const pie = d3.pie().value(function(d) {return d[1]});

    let paths = svg
        .append('g')
        .attr('transform', 'translate(' + donutInnerWidth/2 +  ',' + donutInnerHeight/2 +')')
        .selectAll('path')
        .data(pie(Object.entries(donutChartRatios)))
        .enter()
        .append("path")
        .attr('fill', (d) => color(d.value))


    let angleInterpolation = d3.interpolate(4.973, 2.7);

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150);

    paths.transition()
        .duration(animationSpeed)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });
}

function step3Up(){
    let svg = d3.select("#donutChartSvg").html("");

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet3)

    const pie = d3.pie().value(function(d) {return d[1]});

    let paths = svg
        .append('g')
        .attr('transform', 'translate(' + donutInnerWidth/2 +  ',' + donutInnerHeight/2 +')')
        .selectAll('path')
        .data(pie(Object.entries(donutChartRatios)))
        .enter()
        .append("path")
        .attr('fill', (d) => color(d.value))

    let angleInterpolation = d3.interpolate(6.25, 4.973);

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150);

    paths.transition()
        .duration(animationSpeed)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });
}

function step4Up(){
    let svg = d3.select("#donutChartSvg").html("");

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet3)

    const pie = d3.pie().value(function(d) {return d[1]});

    let paths = svg
        .append('g')
        .attr('transform', 'translate(' + donutInnerWidth/2 +  ',' + donutInnerHeight/2 +')')
        .selectAll('path')
        .data(pie(Object.entries(donutChartRatios)))
        .enter()
        .append("path")
        .attr('fill', (d) => color(d.value))

    let angleInterpolation = d3.interpolate( 6.28319, 6.25);

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150);

    paths.transition()
        .duration(animationSpeed)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }

                d.endAngle = Math.min(currentAngle, originalEnd);

                return arc(d);
            };
        });
}



