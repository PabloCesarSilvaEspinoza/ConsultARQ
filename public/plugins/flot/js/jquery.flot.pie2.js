$(function() {
    'use strict';
/**************** PIE CHART *******************/
    var piedata = [{
            label: "Presupuesto",
            data: [
                [1, 7000]
            ],
            color: '#EB5C99'
        },
        {
            label: "Gasolina/Diesel",
            data: [
                [1, 3000]
            ],
            color: '#44D0EB'
        },
        {
            label: "Viáticos",
            data: [
                [1, 5000]
            ],
            color: '#EBDF73'
        },
        {
            label: "Otros",
            data: [
                [1, 2000]
            ],
            color: '#368E9E'
        }
    ];

    $.plot('#flotPie1', piedata, {
        series: {
            pie: {
                show: true,
                radius: 1,
                label: {
                    show: true,
                    radius: 2 / 3,
                    formatter: labelFormatter,
                    threshold: 0.1
                }
            }
        },
        grid: {
            hoverable: true,
            clickable: true
        }
    });

    function labelFormatter(label, series) {
        return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
    }


});