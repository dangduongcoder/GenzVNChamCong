function getElements(toast, elementRef){
    return toast.querySelectorAll(`[data-ref=${elementRef}]`);
}

function getElement(toast, elementRef){
    return getElements(toast, elementRef)[0];
}

class Toast {
    toasts = [];
    dialogSupported = typeof HTMLDialogElement === 'function';
    #toastContainer = null;

    constructor(settings = {}) {
        this.#init(settings);
    }

    #init(settings) {
        this.SETTINGS = {
            id: 'toast',
            duration: 2000,
            reverseOrder: false,
            ...settings
        };
        
        const toastContainerElm = document.createElement('div');
        toastContainerElm.classList.add(this.SETTINGS.id + '-container');
        this.#toastContainer = document.body.appendChild(toastContainerElm);
    }

    #createToastElement(defaults) {
        const toast = document.createElement('dialog');
        toast.classList.add(...[
            defaults.id, 
            `${defaults.id}-${defaults.type ?? 'default'}`, 
            defaults.className ?? null,
            ...(defaults.classList ? defaults.classList : [null]),
            'align-items-center',
            'border-0',
            'p-0'
        ].filter((token) => token !== null));
        
        if (this.toasts.find((toast) => toast.id === defaults.id)) {
            defaults.id = `${defaults.id}-${this.toasts.length}`;
        }

        toast.setAttribute('id', defaults.id);
        toast.setAttribute('role', 'alert');
        toast.dataset.component = 'toast';
       
        toast.innerHTML = `
            <form method="dialog" data-ref="form">
                <div class="toast-body" data-ref="message"></div>
                ${defaults.autoHide ? '' : '<button type="submit" class="btn-close" aria-label="Close"></button>'}
            </form>
        `;

        this.toasts.push(toast);
        this.#toastContainer[defaults.reverseOrder ? 'prepend' : 'appendChild'](toast);

        return toast;
    }

    #cleanToast(toast) {
        this.toasts = this.toasts.filter((item) => item !== toast);
        toast.remove();
    }

    #setupEvents(toast, settings) {
        toast.addEventListener('close', (event) => {
            toast.dispatchEvent(new Event('cancel'));
            this.#cleanToast(event.target);
        }, { once: true });
        
        if (settings.autoHide) {
            toast.addEventListener('animationend', () => {
                toast.style.animationDelay = `${settings.duration}ms`;
                toast.classList.add('is-closing');
                toast.addEventListener('animationend', () => {
                    toast.classList.add('d-none');
                    toast.close();
                }, { once: true });
            }, { once: true });
        }
    }

    show(settings = {}) {
        const defaults = {
            autoHide: true,
            dismissible: false,
            ...this.SETTINGS,
            ...settings
        };
        
        const toast = this.#createToastElement(defaults);

        const toastMessage = getElement(toast, 'message');
        if (settings.message) {
            toastMessage.innerHTML = settings.message;
        } else if (settings.actions === false || settings.actions === null || settings.actions === '') {
            toastMessage.remove();
        }

        this.#setupEvents(toast, defaults);

        toast.show();

        return toast;
    }

    success(message, config = {}) {
        return this.show({
            type: 'success',
            classList: ['text-white', 'bg-success'],
            message,
            ...config
        });
    }

    error(message, config = {}) {
        return this.show({
            type: 'error',
            classList: ['text-white', 'bg-danger'],
            message,
            ...config
        });
    }
    
    warning(message, config = {}) {
        return this.show({
            type: 'warning',
            classList: ['bg-warning'],
            message,
            ...config
        });
    }
    
    info(message, config = {}) {
        return this.show({
            type: 'info',
            classList: ['bg-info'],
            message,
            ...config
        });
    }
    
    log(message, config = {}) {
        return this.show({
            type: 'log',
            message,
            ...config
        });
    }
    
    closeAll() {
        this.toasts.forEach((toast) => {
            toast.close('close');
        });
    }

    close(id) {
        this.toasts.find((toast) => toast.id === id)?.close('close');
    }
}

const toast = new Toast({
    reverseOrder: true
});

