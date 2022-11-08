let features = ["danceability","energy","speechiness","acousticness","liveness", "valence"];

let radarSvg = undefined;
let radarRadialScale = undefined;

const radarDimension = d3.select('svg');
const radarSvgWidth = +radarDimension.style('width').replace('px','');
const radarSvgHeight = +radarDimension.style('height').replace('px','');

let genreAttributes = {genre: undefined, danceability: 0.0, energy: 0.0, speechiness: 0.0,
    acousticness: 0.0, liveness: 0.0, valence: 0.0};
let genres = [];

let radarAnimationSpeed = 800;

document.addEventListener('DOMContentLoaded', function () {

    // This will load your two CSV files and store them into two arrays.
    Promise.all([d3.csv('data/songs_normalize.csv')])
        .then(function (values) {
            rawSpotifyData = values[0];

            rawSpotifyData = d3.group(rawSpotifyData, d=> d['genre'].split(',')[0]);

            rawSpotifyData.forEach(songsOfGenre => {
                let tempGenreAttributes = Object.create(genreAttributes);
                tempGenreAttributes.genre = songsOfGenre[0]['genre'].split(',')[0];
                songsOfGenre.forEach(song => {
                    tempGenreAttributes.danceability = tempGenreAttributes.danceability + parseFloat(song.danceability) || 0;
                    tempGenreAttributes.energy = tempGenreAttributes.energy + parseFloat(song.energy) || 0;
                    tempGenreAttributes.speechiness = tempGenreAttributes.speechiness + parseFloat(song.speechiness) || 0;
                    tempGenreAttributes.acousticness = tempGenreAttributes.acousticness + parseFloat(song.acousticness) || 0;
                    tempGenreAttributes.liveness = tempGenreAttributes.liveness + parseFloat(song.liveness) || 0;
                    tempGenreAttributes.valence = tempGenreAttributes.valence + parseFloat(song.valence) || 0;

                })
                tempGenreAttributes.danceability = tempGenreAttributes.danceability / songsOfGenre.length;
                tempGenreAttributes.energy = tempGenreAttributes.energy / songsOfGenre.length;
                tempGenreAttributes.speechiness = tempGenreAttributes.speechiness / songsOfGenre.length;
                tempGenreAttributes.acousticness = tempGenreAttributes.acousticness / songsOfGenre.length;
                tempGenreAttributes.liveness = tempGenreAttributes.liveness / songsOfGenre.length;
                tempGenreAttributes.valence = tempGenreAttributes.valence / songsOfGenre.length;

                genres.push(tempGenreAttributes);
            })


            initChart();

        });
});

function initChart(){
    radarSvg = d3.select("#radarChartSvg")
    radarRadialScale = d3.scaleLinear()
        .domain([0,1])
        .range([0,200]);


    let ticks = [0.2,0.4,0.6,0.8,1];

    ticks.forEach(t =>
        radarSvg.append("circle")
            .attr("cx", radarSvgWidth/2)
            .attr("cy", radarSvgHeight/2)
            .transition()
            .duration(radarAnimationSpeed)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("r", radarRadialScale(t))
    );

    ticks.forEach(t =>
        radarSvg.append("text")
            .attr("x", radarSvgWidth/2 + 5)
            .attr("y", radarSvgHeight/2 - radarRadialScale(t))
            .transition()
            .delay(radarAnimationSpeed)
            .duration(radarAnimationSpeed)
            .attr('opacity', 1)
            .text(t.toString())
    );

    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        let line_coordinate = angleToRadarCoordinate(angle, 1);
        let label_coordinate = angleToRadarCoordinate(angle, 1.1);

        //draw axis line
        radarSvg.append("line")
            .attr("x1", radarSvgWidth/2)
            .attr("y1", radarSvgHeight/2)
            .attr("x2", line_coordinate.x)
            .attr("y2", line_coordinate.y)
            .transition()
            .delay(radarAnimationSpeed)
            .duration(radarAnimationSpeed)
            .attr('opacity', 1)
            .attr("stroke","black");

        //draw axis label
        radarSvg.append("text")
            .attr("x", label_coordinate.x)
            .attr("y", label_coordinate.y)
            .transition()
            .delay(radarAnimationSpeed)
            .duration(radarAnimationSpeed)
            .attr('opacity', 1)
            .text(ft_name);
    }

    updateRadarChart('pop');
}

function updateRadarChart(genre){
    let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    let currentGenre = genres.filter(d => d.genre === genre)
    console.log(currentGenre);

    radarSvg.selectAll('.paths')
        .data(currentGenre)
        .join(
            enter => enter.append('path')
                .transition()
                .delay(radarAnimationSpeed+500)
                .duration(radarAnimationSpeed)
                .attr("d",(d) => {return line(getRadarPathCoordinates(d));})
                .attr("stroke-width", 3)
                .attr("stroke", 'lightgreen')
                .attr("fill", 'lightgreen')
                .attr("stroke-opacity", 1)
                .attr("opacity", 0.5),
            update => update
                .transition()
                .duration(radarAnimationSpeed)
                .attr("d",(d) => {return line(getRadarPathCoordinates(d));})
                .style('opacity', 0.5),
            exit => exit
                .transition()
                .duration(radarAnimationSpeed)
                .style('opacity', 0)
                .remove() //Transition the element and then remove
        )
        .classed('paths', true) //Used to change hover opacity
}

function drawCustomGenre(danceability, energy, speechiness, acousticness, liveness, valence){
    let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    let customGenre =  [{genre: 'custom', danceability: +danceability, energy: +energy, speechiness: +speechiness,
        acousticness: +acousticness, liveness: +liveness, valence: +valence}];
    console.log(customGenre);

    radarSvg.selectAll('.customPath')
        .data(customGenre)
        .join(
            enter => enter.append('path')
                .transition()
                .duration(radarAnimationSpeed)
                .attr("d",(d) => {return line(getRadarPathCoordinates(d));})
                .attr("stroke-width", 3)
                .attr("stroke", 'orange')
                .attr("fill", 'orange')
                .attr("stroke-opacity", 1)
                .attr("opacity", 0.5),
            update => update
                .transition()
                .duration(300)
                .attr("d",(d) => {return line(getRadarPathCoordinates(d));})
                .style('opacity', 0.5),
            exit => exit
                .transition()
                .duration(100)
                .style('opacity', 0)
                .remove() //Transition the element and then remove
        )
        .classed('customPath', true) //Used to change hover opacity
}

function getRadarPathCoordinates(data_point){
    let coordinates = [];
    for (var i = 0; i < features.length; i++){
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToRadarCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
}

function angleToRadarCoordinate(angle, value){
    let x = Math.cos(angle) * radarRadialScale(value);
    let y = Math.sin(angle) * radarRadialScale(value);
    return {"x": radarSvgWidth/2 + x, "y": radarSvgHeight/2 - y};
}



