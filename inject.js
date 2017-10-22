// if (document.readyState === 'complete')
//     injectStyle();
// else
//     document.addEventListener('DOMContentLoaded', injectStyle);

injectCloakStyle('cloakfb');

function injectCloakStyle (identifier) {
    var style = document.createElement('style');
    style.id = identifier;
    style.innerHTML = `
    ._p0g.error {
        background-color: rgba(0, 0, 0, .05) !important;
        color: rgba(153, 153, 153, 1) !important;
    }

    ._p0g.error:not(.reconnecting) .message::after {
        content: "Cloak Mode";
    }

    ._p0g.reconnecting {
        background-color: rgba(0, 0, 0, .05);
        color: rgba(153, 153, 153, 1);
    }

    .fbChatReconnectLink {
        display: none !important;
    }

    ._42fz._570- {
        opacity: unset !important;
    }
    
    .fbChatSidebarMessage {
        display: block !important;
    }
    
    .fbChatSidebarMessage .message {
        display: none !important;
    }
    
    .fbChatSidebarMessage::after {
        content: "Cloak Mode";
        padding-left: 2px;
    }    
    `;
    (document.head || document.documentElement).appendChild(style);
}