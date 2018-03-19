_domVer = 0;
States = {
    problems: [],
    _v: 0
}
MountComps = []

window.addEventListener('load', function () {
    console.log('All assets are loaded')
    onSubmitFormInit();
    fetchProblemLists();
})

function onSubmitFormInit() {
    const problemSelect = document.getElementById('problemSets');
    const contextId = document.getElementById('contestId');
    const fileInput = document.getElementById('solutionFile');
    const form = document.getElementById('contestSubmitForm');

    form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            event.stopPropagation();

            const problemId = problemSelect.value;
            const contestId = contextId.value;

            var data = new FormData()
            data.append('engine', 'node');
            data.append('input', fileInput.files[0])

            fetch(`/doTest/${problemId}`, {
                method: 'POST',
                body: data
            })
                .then(res => {
                    return res.json();
                })
                .then(testResult => {
                    setState({
                        lastResult: testResult
                    })
                })
                .catch(err => console.log(err))
        }
    }, false);
}

function fetchProblemLists() {
    fetch('/problems')
        .then(res => {
            return res.json()
        })
        .then(problemData => {
            console.log('fetchProblemLists', problemData);
            this.setState({ problems: problemData });
        })
        .catch(err => console.error(err))
}

// Component TestResult
function updateTestResultContainer(props) {
    const containerDom = document.getElementById('testResultContainer');
    const summaryResult = document.getElementById('testSummary');
    const runId = document.getElementById('testRunId');
    const testResultTemplate = document.getElementById('testCasteTemplate');
    const { _id, testResult } = props.lastResult;

    containerDom.innerHTML = ''
    runId.innerHTML = 'RunId: ' + _id;
    
    let totalPass = 0;
    testResult.forEach(itm => {
        if (itm.result) totalPass++;
        const clon = document.importNode(testResultTemplate.content, true);//testResultTemplate.content.cloneNode(true);
        clon.id = itm.name;

        const title = document.getElementInsideContainer(clon, 'title')
        const collapseContent = document.getElementInsideContainer(clon, 'collapseContent');
        const detail = document.getElementInsideContainer(clon, 'detail')

        // Link collapse
        const collapseUdid = itm.name
        collapseContent.id = collapseUdid;
        $(title).attr('data-target','#' + collapseUdid);

        // Style Items
        if(itm.result) {
            title.innerHTML = itm.name + ' - Pass'
            title.className = title.className + ' text-success'
        }
        else {
            title.innerHTML = itm.name + ' - Failed'
            title.className = title.className + ' text-danger'
        }
        
        // Detailed Info
        detail.innerHTML = `<ul>
            <li>Expected: ${itm.expected}</li>
            <li>Output: ${itm.output}</li>
            <li>Log:</li>
        </ul>
        <pre>
        ${itm.log}
        </pre>`

        containerDom.appendChild(clon);
    })

    summaryResult.innerHTML = `Pass: ${totalPass}/${testResult.length}`
}
const TestResultComponent = updateWhenPropsChange({
    "lastResult": "lastResult"
})(updateTestResultContainer)
MountComps.push(TestResultComponent)

// Component Select
function updateProblemSelectComp(props) {
    const dom = document.getElementById('problemSets');
    dom.innerHTML = '';
    const items = props.problems.forEach(itm => {
        const option = document.createElement('option');
        option.text = itm;
        option.value = itm;
        dom.add(option);
    })
    dom.value = props.problems[0];
}

const SelectComponent = updateWhenPropsChange({
    "problems": "problems"
})(updateProblemSelectComp)
MountComps.push(SelectComponent)


// My React Ver - Maily for learning
function setState(obj) {
    States = { ...States, ...obj, _v: States._v + 1 };
    setTimeout(_ => {
        domUpdate();
    }, 0)
}

function domUpdate() {
    if (_domVer == States._v) return;
    _domVer = States._v;
    MountComps.forEach(itm => itm(States));
}

function updateWhenPropsChange(props) {
    const cache = {}
    return func => newState => {
        if (!Object.keys(props).some(key => newState[key] != cache[key]))
            return;
        Object.keys(props).forEach(key => cache[key] = newState[key])
        func({ ...cache });
    }
}

document.getElementInsideContainer = function (containerElement, childID) {
    return containerElement.querySelector("#" + childID);
}