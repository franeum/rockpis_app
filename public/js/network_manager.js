// network-manager
// Empty JS for your own code to be here

let module_list = {}
let counter_id = 0
let editmode = false  
let selected_node_id = null 



let module_node = {
  label: 'name'
}




let cy_content = {

  container: $('#the-network'), // container to render in
  elements: [ // list of graph elements to start with
    // nodes and edges
  ],
  style: cy_style,
  layout: {
    name: 'grid'
    //rows: 1
  }
}


let cy = cytoscape(cy_content);

cy.cxtmenu({
  menuRadius: 250,
  separatorWidth: 10,
  minSpotlightRadius: 48,
  selector: 'node, edge',
  commands: [
    {
      content: '<span class="fa fa-flash fa-2x"></span>',
      select: function(ele){
        console.log( ele.id() );
      }
    },
    {
      content: '<span class="fa fa-star fa-2x"></span>',
      select: function(ele){
        console.log( ele.data('name') );
      }//,
      //enabled: false
    },
    {
      content: 'chorus',
      select: function(ele){
        console.log( ele.position() );
      }
    },
    {
      content: 'sto cazzo',
      select: function(ele){
        //console.log( ele.position() );
        coord = ele.position()
        create_node('tastooma', coord.x + 100, coord.y + 100)
      }
    }
  ]
});

















let network_clear = () => {
  let collection = cy.elements('node')
  cy.remove( collection )
  counter_id = 0
}


/*
 *  EVENTI
 */



// CLICK

cy.on('tap', (event) => {
  let data = event.target 
  if (editmode) {
    if (data === cy) {
      selected_node_id = null 
      create_node(event.position.x, event.position.y)
    }
  } else {
    if (data === cy) {
      console.log("tap with no edit")
      selected_node_id = null  
    }
  }
})


// RIGHT CLICK

cy.on('cxttap', (event) => {
  console.log("right click event")
  set_controller(event.position)
})


// NODE SELECTION

cy.on('select', 'node', (event) => {
  console.log("select node event")

  let id_selected = event.target._private.data.id
  
  cy.$('#' + id_selected).classes('nodeSelectedClass')
  if (selected_node_id == null) {
    selected_node_id = id_selected
  } else {
    if (selected_node_id !== id_selected) {
      create_edge(selected_node_id, id_selected)
      selected_node_id = id_selected 
    }
  }
  
})


// EDGE SELECTION

cy.on('select', 'edge', (event) => {
  console.log("edge select event")

  let id_selected = event.target._private.data.id
  console.log(id_selected)
  cy.$('#' + id_selected).classes('edgeSelectedClass')
})


// UNSELECTION

cy.on('unselect', (event) => {
  //if (event.target === cy)
  console.log("unselect event")
})


// UNSELECTION SPECIFIC

cy.on('unselect', 'node', (event) => {
  console.log("unselect node event")
  let n = event.target._private.data.id
  cy.$('#' + n).classes('nodes')
  //selected_node_id = null 
})


cy.on('unselect', 'edge', (event) => {
  console.log("unselect edge event")
  let n = event.target._private.data.id
  cy.$('#' + n).classes('edges')
  //selected_node_id = null 
})



Mousetrap.bind("ctrl+x", function() { 
  console.log('show shortcuts X')
});



let create_module_list = (array) => {
  Object.assign(module_list, array)
}



// CREATE NODE

let prepare_to_create_node = (name) => {
  set_cursor_to_edit_mode()
  editmode = true  
  module_node.label = name 
}


let create_node = (x, y) => {
  cy.add({
    group: 'nodes',
    data: { id: counter_id, label: module_node.label },
    position: { x: x, y: y }
  })

  counter_id += 1
  editmode = false 
  destroy_module_list()
  set_cursor_to_default_mode()
}


let set_cursor_to_edit_mode = () => {
  $('html').css('cursor', 'crosshair')
}


let set_cursor_to_default_mode = () => {
  $('html').css('cursor', 'default')  
}


let create_edge = (source, target) => {
  console.log("elements to edge", source, target)
  cy.add({
    group: 'edges',
    data: {
      source: source,
      target: target
    }
  })
  //set_cursor_to_default_mode()
}


let destroy_module_list = () => {
  $("#the-controller").empty()
}


let set_controller = (pos) => {
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
    let parameters = `"${x}",${pos.x},${pos.y}`
    $("#the-controller").append(
      $("<div class='row'><button type='button' onclick='create_node(" + parameters + ")' class='btn btn-block btn-sm'>" + x + "</button></div>")
    )  
  })
}



// GET GRAPH

let get_graph = () => {

  /*
  let options = {
    root: "#0"
  }

  let dfs = cy.elements().dfs(options)
  console.log(dfs.path)
  */

  let root = null;

  cy.nodes().forEach((e) => {
    console.log(e)
    if (e._private.data.label === "audioout") root = e.id()
  });
  
  console.log("audioout is:", root)
}