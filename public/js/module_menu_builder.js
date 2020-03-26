function make_module_menu(modules) {
    Object.keys(modules).forEach(x => {
        let name = modules[x].name.toUpperCase()
        let opentag = "<a class='dropdown-item' onclick='prepare_to_create_node(\"" + x + "\")'>"
        let closetag = "</a>"
        $("#module-menu").append(opentag + name.toUpperCase() + closetag)
    })
}

function render(array) {
    make_module_menu(array)
}