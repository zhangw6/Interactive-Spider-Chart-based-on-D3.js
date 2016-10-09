var RadarChart = {
    draw: function (id, d, options) {
        var cfg = {
            radius: 4,
            w: 600,
            h: 600,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: ["yellow", "blue"],
            test: 333,
            minValue: [],
            sequence: [],
            maxData:[],
            zoom:100
        };

       if ('undefined' !== typeof options) {
            for (var i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }

           }
        }

       cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function (i) {
            return d3.max(i.map(function (o) {
                return o.value;
            }))
        }));
        var allAxis = (d[0].map(function (i, j) {
            return i.attribute_name;
        }));
        var total = allAxis.length;
        var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
        var Format = d3.format(".2f");
        d3.select(id).select("svg").remove();

       var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w + cfg.ExtraWidthX)
            .attr("height", cfg.h + cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
        ;

        var tooltip;

console.log("asda"+(cfg.radians));

       //Circular segments
        // for (var j = 0; j < cfg.levels - 1; j++) {
        //     var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
        //     g.selectAll(".levels")
        //         .data(allAxis)
        //         .enter()
        //         .append("svg:line")
        //         .attr("x1", function (d, i) {
        //             return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
        //         })
        //         .attr("y1", function (d, i) {
        //             return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
        //         })
        //         .attr("x2", function (d, i) {
        //             return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total));
        //         })
        //         .attr("y2", function (d, i) {
        //             return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total));
        //         })
        //         .attr("class", "line")
        //         .style("stroke", "grey")
        //         .style("stroke-opacity", "0.75")
        //         .style("stroke-width", "0.3px")
        //         .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
        // }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w / 2)
            .attr("y1", cfg.h / 2)
            .attr("x2", function (d, i) {
                console.log("x: "+(cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total))));
                return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));

            })
            .attr("y2", function (d, i) {
                 console.log("y: "+(cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total))));

                return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
            })
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function (d) {
                return d
            })
            .style("font-family", "sans-serif")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function (d, i) {
                return "translate(0, -10)"
            })
            .attr("x", function (d, i) {
                return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total);
            })
            .attr("y", function (d, i) {
                return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 25 * Math.cos(i * cfg.radians / total);
            });

       var n = d[0].length;

        d.forEach(function (y, x) {
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function (j, i) {

                    if (cfg.sequence[i] == 0) {
             
                        dataValues.push([
                            cfg.w / 2 * (1 - (parseFloat(Math.max(cfg.zoom*(cfg.maxData[i] - j.value)/(cfg.maxData[i]-cfg.minValue[i]), 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                            cfg.h / 2 * (1 - (parseFloat(Math.max(cfg.zoom*(cfg.maxData[i] - j.value)/(cfg.maxData[i]-cfg.minValue[i]), 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                        ]);
                    }

                   if (j.value > cfg.minValue[i] && cfg.sequence[i] != 0) {

                        dataValues.push([
                         cfg.w / 2 * (1 - (parseFloat(Math.max(cfg.zoom*(j.value-cfg.minValue[i])/(cfg.maxData[i]-cfg.minValue[i]), 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                         cfg.h / 2 * (1 - (parseFloat(Math.max(cfg.zoom*(j.value-cfg.minValue[i])/(cfg.maxData[i]-cfg.minValue[i]), 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                        ]);
                    } else if ((2 * Math.PI / n) * i <= 2 * Math.PI && cfg.sequence[i] != 0) {

                        dataValues.push([

                            130 - j.value * Math.sin((2 * Math.PI / n) * i) * 80, 130 - j.value * Math.cos((2 * Math.PI / n) * i) * 80
                        ]);
                    }

                });
				
            dataValues.push(dataValues[0]);

            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie" + series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color[series])
                .attr("points", function (d) {

                    var str = "";
                    for (var pti = 0; pti < d.length - 1; pti++) {

                       str = str + d[pti][0] + "," + d[pti][1] + " ";
                    }
                    return str;
                })
                .style("fill", function (j, i) {
                    return cfg.color[series]
                })
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d) {

                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                                 
           


           

                })

               .on('mouseout', function () {
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });

            series++;
        });

       series = 0;

  


       d.forEach(function (y, x) {
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie" + series)
                .attr('r', cfg.radius)
                .attr("alt", function (j) {
                    return Math.max(j.value, 0)
                })
                .attr("cx", function (j, i) {

                   if (cfg.sequence[i] == 0) {

                        dataValues.push([
                            cfg.w / 2 * (1 - (parseFloat(Math.max(cfg.maxData[i] - j.value + 0.1, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                            cfg.h / 2 * (1 - (parseFloat(Math.max(cfg.maxData[i] - j.value + 0.1, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                        ]);

                        return cfg.w / 2 * (1 - (parseFloat(Math.max(cfg.zoom*(cfg.maxData[i] - j.value)/(cfg.maxData[i]-cfg.minValue[i]), 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));

                 
                    }

                   if (j.value > cfg.minValue[i] && cfg.sequence[i] != 0) {

                        dataValues.push([
                            cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                            cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                        ]);

                       return cfg.w / 2 * (1 - (Math.max(cfg.zoom*(j.value-cfg.minValue[i])/(cfg.maxData[i]-cfg.minValue[i]), 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
                    }

                    else if (cfg.sequence[i] != 0) {

                       return 130 - j.value * Math.sin((2 * Math.PI / n) * i) * 80;
                    }

               })
                .attr("cy", function (j, i) {

                    if (cfg.sequence[i] == 0) {

                        dataValues.push([
                            cfg.w / 2 * (1 - (parseFloat(Math.max(cfg.maxData[i] - j.value + 0.1, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                            cfg.h / 2 * (1 - (parseFloat(Math.max(cfg.maxData[i] - j.value + 0.1, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                        ]);

                        return cfg.h / 2 * (1 - (parseFloat(Math.max(cfg.zoom*(cfg.maxData[i] - j.value)/(cfg.maxData[i]-cfg.minValue[i]), 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));

                   }

                   if (j.value > cfg.minValue[i] && cfg.sequence[i] != 0) {

                        return cfg.h / 2 * (1 - (Math.max(cfg.zoom*(j.value-cfg.minValue[i])/(cfg.maxData[i]-cfg.minValue[i]), 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
                    }
                    else if (cfg.sequence[i] != 0) {

                        return 130 - j.value * Math.cos((2 * Math.PI / n) * i) * 80;
                    }
                })
                .attr("data-id", function (j) {
                    return j.attribute_name;
                })
                .style("fill", cfg.color[series]).style("fill-opacity", .9)
                .on('mouseover', function (d) {
                    // newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                    // newY =  parseFloat(d3.select(this).attr('cy')) - 5;

                   z = "polygon." + d3.select(this).attr("class");

                    var ser = g.selectAll(z).attr("points");
                    res = ser.split(" ");
                    ds = dataValues;
                    for (var pti = 0; pti < ds.length - 1; pti++) {

                       newX = ds[pti][0];
                        newY = ds[pti][1];
                   }

                   g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function () {
                    tooltip
                        .transition(200)
                        .style('opacity', 0);
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                })
                .append("svg:title")
                .text(function (j) {
                    return Math.max(j.value, 0)
                });

            series++;
        });
        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');

   }


};