let pd_patch = ""
let initString = "#N canvas 800 800 500 400 12;\n"
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
    pd_patch += init_object + `200 ${(idx+1) * 80} ` + e.pd_name + end_row
  });

  connections.forEach(e => {
    pd_patch += init_connect + `${e.source} 0 ${e.target} 0` + end_row
  })

  return pd_patch
}