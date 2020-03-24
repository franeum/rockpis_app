// network-manager
// Empty JS for your own code to be here

let module_list = {}

let cy_content = {

  container: $('#the-network'), // container to render in
  elements: [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
  ],
  style: [ // the stylesheet for the graph 
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'grid',
    rows: 1
  }
}


let cy = cytoscape(cy_content);


let network_clear = () => {
  let collection = cy.elements('node');
  cy.remove( collection );
}


cy.on('tap', (event) => {
  let data = event.target 
  if (data === cy) {
    let coord = event.position 
    console.log(event)
    cy.add({
      group: 'nodes',
      position: { x: coord.x, y: coord.y }
    });
  }
})

cy.on('cxttap', (event) => {
  console.log("right click event")
  set_controller()
})


let create_module_list = (array) => {
  Object.assign(module_list, array)
}



let set_controller = () => {
  /*
  $("#the-controller").empty()

  $("#the-controller").append(
    $("<div></div>")
      .addClass("row")
      .addClass("mx-3 my-5")
      .attr("id", "slider1")
  )
  */

  $("#the-controller").empty()

  Object.keys(module_list).forEach(x => {
    $("#the-controller").append(
      $("<div class='row'><button type='button' class='btn btn-block btn-sm'>" + x + "</button></div>")
    )  
  })

  Object.keys(module_list).forEach(x => {
    $("#the-controller").append(
      $("<div class='row'><button type='button' class='btn btn-block btn-sm'>" + x + "</button></div>")
    )  
  })

  Object.keys(module_list).forEach(x => {
    $("#the-controller").append(
      $("<div class='row'><button type='button' class='btn btn-block btn-sm'>" + x + "</button></div>")
    )  
  })
}