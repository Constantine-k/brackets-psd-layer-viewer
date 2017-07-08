define(function(require, exports, module) {
	
    var CommandManager = brackets.getModule("command/CommandManager"),
    Menus = brackets.getModule("command/Menus"),
	KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
    PanelManager = brackets.getModule("view/PanelManager"),
    ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),        
    AppInit = brackets.getModule("utils/AppInit");

    var LAYERS_EXECUTE = "layers.execute";
    var panel;
    var panelHtml = require("text!panel.html");
	var $layersIcon = $('<a href="#" title="PSD Layer Viewer" id="brackets-psd-layers-icon"></a>');
	
	// Keyboard shortcut
	CommandManager.register("Open PSD Layer Viewer", LAYERS_EXECUTE, handleLayers);
	KeyBindingManager.addBinding(LAYERS_EXECUTE, "Ctrl-Shift-P");

    function handleLayers() {
        if(panel.isVisible()) {
            panel.hide();
			$layersIcon.removeClass('active');
            CommandManager.get(LAYERS_EXECUTE).setChecked(false);
        } else {
            panel.show();
			$layersIcon.addClass('active');
            CommandManager.get(LAYERS_EXECUTE).setChecked(true);
        }
    }

    AppInit.appReady(function () {
        $layersIcon.click(function () {
            handleLayers();
        }).appendTo("#main-toolbar .buttons");
		
		ExtensionUtils.loadStyleSheet(module, "styles.css");
        panel = PanelManager.createBottomPanel(LAYERS_EXECUTE, $(panelHtml),200);
    });
	
});