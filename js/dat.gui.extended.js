
// add internatioalisation
dat.GUI.prototype.addLabels = function(dict, lang) {
    
    var lang = lang || navigator.language.substr(0,2);
    
    if (lang in dict) {
        
        function renameControllers(controllers) {
            for(var i = 0; i < controllers.length; i++) {
                var ctrl = controllers[i];
                if(ctrl.property in dict[lang]) {
                    ctrl.name(dict[lang][ctrl.property]);
                }
            }
        }

        renameControllers(this.__controllers);
        
        for(var label in this.__folders) {
            var folder = this.__folders[label];
            if(label in dict[lang]) {
                folder.name =  dict[lang][label];
            }
            renameControllers(folder.__controllers);
        }
    }
}


// get controllers by label
dat.GUI.prototype.getController = function(label) {
    return this.__controllers.filter(x => x.name = label)[0];
}

// open  all folders
dat.GUI.prototype.openAll = function() {
    this.open();
    Object.values(gui.__folders).forEach( f => f.open());
}

// disable a controller, so it can be used for display only
dat.controllers.Controller.prototype.disable = function() {
    var e = this.domElement;
    e.style.pointerEvents = "none";
    // we might want to use a css class instead ...
    e.querySelector('.slider-fg').style.background = "rgba(255, 255, 255, 0.5)";
    e.querySelector('input').style.color = "#eeeeee";
}  

dat.controllers.Controller.prototype.listenOnly = function() {
    this.listen();
    this.disable();
}
