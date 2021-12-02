window.onload = () => {
    const leadForm = document.getElementById('leadForm');
    const tabs = document.getElementById('tabs');
    const tab1 = document.getElementById('doublescroll1');
    const tab2 = document.getElementById('doublescroll2');
    const tab3 = document.getElementById('doublescroll3');
    window['moment-range'].extendMoment(moment);

    const validateRange = (min, max, value) => {
        let startDate = new Date(min);
        let endDate = new Date(max);
        let date = new Date(value);
        let range = moment().range(startDate, endDate);
        const dateinRange = range.contains(date);
        return dateinRange;
    }

    const weekInformation = [{
            week: 0,
            show: validateRange('2021-11-18', '2021-11-30', new Date()),
            // show: false,
            element: document.getElementById('week0'),
            banner: localStorage.getItem(`new-visitor-week-${0}`) ? false : true
        },
        {
            week: 1,
            show: validateRange('2021-12-01', '2021-12-10', new Date()),
            // show: false,
            element: document.getElementById('week1'),
            banner: localStorage.getItem(`new-visitor-week-${1}`) ? false : true
        },
        {
            week: 2,
            show: validateRange('2021-12-11', '2021-12-20', new Date()),
            // show: false,
            element: document.getElementById('week2'),
            banner: localStorage.getItem(`new-visitor-week-${2}`) ? false : true
        },
        {
            week: 3,
            show: validateRange('2021-12-21', '2021-12-31', new Date()),
            // show: false,
            element: document.getElementById('week3'),
            banner: localStorage.getItem(`new-visitor-week-${3}`) ? false : true
        },
    ];

    const setLocalStorage = (key, isInRange, week) => {
        const newVisitor = localStorage.getItem(key) ? false : true;
        weekInformation[week].banner = newVisitor;
        if (isInRange) {
            localStorage.setItem(key, newVisitor);
        }
    }

    const showInformation = () => {
        weekInformation.forEach(item => {
            if (item.show || (item.week === 1 && weekInformation[0].show === true)) {
                item.element.classList.toggle('d-none');
                item.element.classList.add('d-block');
                // console.log('show', item);
                setLocalStorage(`new-visitor-week-${item.week}`, item.show, item.week)
            } else {
                setLocalStorage(`new-visitor-week-${item.week}`, item.show, item.week)
                item.element.classList.remove('d-block');
                item.element.classList.add('d-none');
                // item.element.classList.toggle('d-none');
                // console.log('hide', item);
            }
        })
    }

    showInformation();

    let bannersTempArr = document.getElementById('banners').children;
    let banners = [];
    for (var i = 0; i < bannersTempArr.length; i++) {
        banners.push(bannersTempArr[i])
    }

    // weekInformation.forEach((week, idx) => {
    //     for (let index = 0; index < banners.length; index++) {
    //         console.log(index);
    //         if (week.show && week.banner) {
    //             banners[index].classList.toggle('d-none');
    //         } else if (week.show && week.banner === false) {
    //             if(index+1 !== 8){
    //                 banners[index + 1].classList.toggle('d-none');
    //             }
    //         }
    //     }
    // });



    if (weekInformation[0].show && weekInformation[0].banner) {
        banners[0].classList.toggle('d-none');
    } else if (weekInformation[0].show && weekInformation[0].banner === false) {
        banners[1].classList.toggle('d-none');
    }

    if (weekInformation[1].show && weekInformation[1].banner) {
        banners[2].classList.toggle('d-none');
    } else if (weekInformation[1].show && weekInformation[1].banner === false) {
        banners[3].classList.toggle('d-none');
    }

    if (weekInformation[2].show && weekInformation[2].banner) {
        banners[4].classList.toggle('d-none');
    } else if (weekInformation[2].show && weekInformation[2].banner === false) {
        banners[5].classList.toggle('d-none');
    }

    if (weekInformation[3].show && weekInformation[3].banner) {
        banners[6].classList.toggle('d-none');
    } else if (weekInformation[3].show && weekInformation[3].banner === false) {
        banners[7].classList.toggle('d-none');
    }

    // console.log('show complete', weekInformation);
    // console.log('banners', banners);

    let hideOnClose = document.getElementsByClassName('hideOnClose');
    let hideOnCloseWeek = [];
    for (var i = 0; i < hideOnClose.length; i++) {
        hideOnCloseWeek.push(hideOnClose[i])
    }

    // console.log(hideOnClose);

    const closeWeeks = () => {
        let noWeekActive = weekInformation.filter(week => week.show === true);
        // let noWeekActive = [];
        if (noWeekActive && noWeekActive.length === 0) {
            document.getElementById('closeWeeks').classList.remove('d-none');
            hideOnCloseWeek.forEach(item => {
                item.classList.add('d-none');
            })
            document.getElementById('nombre').readOnly = true;
            document.getElementById('documento').readOnly = true;
            document.getElementById('email').readOnly = true;
            console.log('show banner close weeks');
        }
        // console.log('status', noWeekActive);
    }

    closeWeeks();


    // Form submit
    const dataForm = {
        nombre: '',
        documento: '',
        email: ''
    }

    const inputs = document.querySelectorAll('input');
    
    inputs.forEach((elem, idx) => {
        elem.oninput = (e) => {
            dataForm[e.target.name] = e.target.value;
            validateForm(dataForm);
        }
    });

    const isValidInput = {
        nombre: false,
        documento: false,
        email: false
    }

    document.getElementById("btn-send").disabled = true;

    const validateForm = () => {
        let nameHelp = document.querySelector('#nameHelp');
        let documentHelp = document.querySelector('#documentHelp');
        let emailHelp = document.querySelector('#emailHelp');
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const documentoRgx = /[0-9]+$/;

        const {
            nombre,
            documento,
            email
        } = dataForm;
        if (nombre && nombre.trim().length > 5) {
            isValidInput['nombre'] = true;
            nameHelp.style.display = 'none';
        } else {
            isValidInput['nombre'] = false;
            nameHelp.style.display = 'block';
        }

        if (documento.length > 5 && documento.length < 11 && documentoRgx.test(documento)) {
            isValidInput['documento'] = true;
            documentHelp.style.display = 'none';
        } else {
            isValidInput['documento'] = false;
            documentHelp.style.display = 'block';
        }

        if (email && email.trim().length > 5 && emailRegex.test(email)) {
            isValidInput['email'] = true;
            emailHelp.style.display = 'none';
        } else {
            isValidInput['email'] = false;
            emailHelp.style.display = 'block';
        }

        if (isValidInput['email'] && isValidInput['documento'] && isValidInput['nombre']) {
            document.getElementById("btn-send").disabled = false;
            return true;
        } else {
            document.getElementById("btn-send").disabled = true;
            return false;
        }
    }

    leadForm.onsubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        var url = 'http://localhost:3000/api';
        var data = dataForm;


        fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                res => res.json()
                let status = true;
                let httpCode = 201;
                if(response.status != 201){
                    status = false;
                }
                showModalOnSend(status,response.status);
            })
            .catch(error => {
                console.error('Error:', error)
                showModalOnSend(false);
            });

            resetForm();
    }

    const showModalOnSend = (status,httpCode) => {
        if(httpCode == 409 ){
            $('#modalErrorDoc').modal('show');
        }else if(status) {
            $('#modalResponse').modal('show');
            document.getElementById("btn-send").disabled = true;
            document.getElementById("btn-send").innerText = "Enviado"
            // $("#modalResponse").modal("hide");
        } else {
            $('#modalError').modal('show');
            // $("#modalError").modal("hide");
        }
    }

    const resetForm = () => {
        inputs.forEach((elem, idx) => {
            dataForm[elem.name] = '';
            elem.value = '';
            validateForm(dataForm);
        });
    }

    const doubleScroll = (element) => {
        var scrollbar = document.createElement('div');
        scrollbar.appendChild(document.createElement('div'));
        scrollbar.style.overflow = 'auto';
        // scrollbar.style.overflowY = 'hidden';
        scrollbar.firstChild.style.width = element.scrollWidth + 'px';
        scrollbar.firstChild.style.paddingTop = '2px';
        scrollbar.classList.add('double-scroll');
        scrollbar.firstChild.appendChild(document.createTextNode('\xA0'));
        var running = false;
        scrollbar.onscroll = function () {
            if (running) {
                running = false;
                return;
            }
            running = true;
            element.scrollLeft = scrollbar.scrollLeft;
        };
        element.onscroll = function () {
            if (running) {
                running = false;
                return;
            }
            running = true;
            scrollbar.scrollLeft = element.scrollLeft;
        };
        element.parentNode.insertBefore(scrollbar, element);
    }

    doubleScroll(tab1);
    doubleScroll(tab2);
    doubleScroll(tab3);
};

console.log('versión 1 OK => ', new Date(2021, 10, 25));