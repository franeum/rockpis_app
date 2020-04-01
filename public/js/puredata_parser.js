let pd_patch = ""
let initString = "#N canvas 100 100 600 600 12;\n"
let init_object = "#X obj "
let init_connect = "#X connect "
let end_row = ";\n"

let pd_parser = (obj) => {

  pd_patch = initString

  let modules = obj.filter(x => {
    return x.type === "module"
  })

  let connections = obj.filter(x => {
    return x.type === "connect"
  })


  modules.forEach((e, idx) => {
    let x = Math.floor(Math.random() * 500)
    let y = Math.floor(Math.random() * 600);
    pd_patch += init_object + `${x} ${y} ` + e.pd_name + end_row
  });

  connections.forEach(e => {
    pd_patch += init_connect + `${e.source} 0 ${e.target} 0` + end_row
  })

  return pd_patch
}