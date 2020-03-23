// network-manager
// Empty JS for your own code to be here

let module_list = {}
let nodes = []
let edges = []
let network = null
let counter_id = 0

let options = {
  physics: {
    enabled: false,
    stabilization: false
  },
  layout: {
    hierarchical: {
      enabled: false,
      direction: 'LR'
    }
  },
  nodes: {
    borderWidth: 0,
    shape: "circularImage",
    fixed: {
      x: false,
      y: false
    },
    size: 50,
    shadow: true,
    mass: 1
  },
  edges: {
    width: 4,
    color: {
      color: '#000000'
    },
  }
}

let network_clear = () => {
  nodes = []
  edges = []
  //network_init()
  //draw()
  network.destroy()
}


/*
let network_init = () => {
  let io = ['audioin', 'audioout']
  io.forEach((x) => {
    create_node(x)
  })
  draw()
}
*/


let create_edges = () => {
  // azzero gli edges (?)
  /*
  edges = []
  if (nodes.length > 1) {
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        from: i,
        to: i + 1
      })
    }
  }
  */
  draw()
}


let create_id = () => {
  let new_arr = nodes.filter((x) => {
    return !x['last']
  })
  let last_arr = nodes.filter((x) => {
    return x['last']
  })

  nodes = new_arr.concat(last_arr)

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].id = i
  }

  //callback()
}


let create_node = (mod) => {
  let image = module_list[mod]["image"]
  let selected = module_list[mod]["image_selected"]
  let last = module_list[mod]["last"]
  nodes.push({
    id: counter_id,
    image: {
      unselected: image,
      selected: selected
    },
    last: last,
    x: 0,
    y: 0
  })
  counter_id += 1
  console.log("counter", counter_id)
  create_id()
  draw()
}


let create_module_list = (array) => {
  Object.assign(module_list, array)
}


let draw = () => {
  // create a network
  if (network) network.destroy()
  let container = document.getElementById('the-network')

  let data = {
    nodes: nodes,
    edges: edges
  };
  console.log(nodes)
  
  network = new vis.Network(container, data, options)
  let positions = network.getPositions()
  console.log(positions)
  for (let i=0; i<nodes.length; i++) {
    nodes[i].x = positions[0].x
    nodes[i].y = positions[0].y
  }
  
  network.on('selectNode', (params) => {
    console.log('selectNode event: ', params)
    console.log(params)
    let id = params.nodes[0]
    let x = params.pointer.canvas.x
    let y = params.pointer.canvas.y 
    nodes.forEach(n => {
      if (n.id == id) {
        nodes[id].x = x 
        nodes[id].y = y
      } 
    })
  })

  network.on('click', (params) => {
    console.log('click event: ', params)  
  })

  network.on('dragEnd', (params) => {
    let id = params.nodes[0]
    let x = params.pointer.canvas.x
    let y = params.pointer.canvas.y 
    nodes.forEach(n => {
      if (n.id == id) {
        nodes[id].x = x 
        nodes[id].y = y
      } 
    })
    console.log(nodes)
  })
}

let set_controller = () => {
  
  $("#the-controller").empty()

  $("#the-controller").append(
    $("<div></div>")
      .addClass("row")
      .addClass("mx-3 my-5")
      .attr("id", "slider1")
  )

  $("#the-controller").append(
    $("<div></div>")
      .addClass("row")
      .addClass("mx-3 my-5")
      .attr("id", "slider2")
  )

  $("#slider1").slider()
  $("#slider2").slider()
}