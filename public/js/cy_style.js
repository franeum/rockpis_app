let cy_style = [ // the stylesheet for the graph 
    {
      selector: "node",
      style: {
        "shape": "ellipse",
        "width": 100,
        "height": 100,
        "background-color": "#FF8800",
        "ghost": "no",
        "ghost-opacity": 0.1,
        "ghost-offset-x": "3px",
        "ghost-offset-y": "3px",
        "label": "data(label)",
        "color": "#ffffff",
        "font-family": "arial",
        "font-size": "1.25em",
        "text-valign": "center",
        "text-halign": "center"
      }
    },
    {
      selector: ".nodeSelectedClass",
      style: {
        "shape": "ellipse",
        "width": 100,
        "height": 100,
        "background-color": "#0099ff",
        "ghost": "no",
        "ghost-opacity": 0.1,
        "ghost-offset-x": "3px",
        "ghost-offset-y": "3px",
        "label": "data(label)",
        "color": "#ffffff",
        "font-family": "arial",
        "font-size": "1.25em",
        "text-valign": "center",
        "text-halign": "center"
      }
    },
    {
      selector: "edge",
      style: {
        "width": 2,
        "line-color": "#000000",
        "target-arrow-color": "#666",
        "target-arrow-shape": "triangle"
      }
    },
    {
      selector: ".edgeSelectedClass",
      style: {
        "width": 8,
        "line-color": "#999999",
        "target-arrow-color": "#666",
        "target-arrow-shape": "triangle"
      }
    }
  ]