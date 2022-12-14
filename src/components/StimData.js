/* stimOptions (len = 77) come from the select_stimuli.py script */
const stimOptions = [
    ["task-1", "task-10", "task-3"],
    ["task-1", "task-11", "task-4"],
    ["task-1", "task-12", "task-5"],
    ["task-1", "task-13", "task-6"],
    ["task-1", "task-14", "task-7"],
    ["task-1", "task-2", "task-3"],
    ["task-1", "task-2", "task-4"],
    ["task-1", "task-2", "task-5"],
    ["task-1", "task-2", "task-6"],
    ["task-1", "task-2", "task-7"],
    ["task-1", "task-3", "task-4"],
    ["task-1", "task-3", "task-5"],
    ["task-1", "task-3", "task-6"],
    ["task-1", "task-3", "task-7"],
    ["task-1", "task-4", "task-5"],
    ["task-1", "task-4", "task-6"],
    ["task-1", "task-4", "task-7"],
    ["task-1", "task-5", "task-6"],
    ["task-1", "task-5", "task-7"],
    ["task-1", "task-6", "task-7"],
    ["task-1", "task-9", "task-2"],
    ["task-10", "task-3", "task-4"],
    ["task-10", "task-3", "task-5"],
    ["task-10", "task-3", "task-6"],
    ["task-10", "task-3", "task-7"],
    ["task-11", "task-4", "task-5"],
    ["task-11", "task-4", "task-6"],
    ["task-11", "task-4", "task-7"],
    ["task-12", "task-5", "task-6"],
    ["task-12", "task-5", "task-7"],
    ["task-13", "task-6", "task-7"],
    ["task-2", "task-10", "task-3"],
    ["task-2", "task-11", "task-4"],
    ["task-2", "task-12", "task-5"],
    ["task-2", "task-13", "task-6"],
    ["task-2", "task-14", "task-7"],
    ["task-2", "task-3", "task-4"],
    ["task-2", "task-3", "task-5"],
    ["task-2", "task-3", "task-6"],
    ["task-2", "task-3", "task-7"],
    ["task-2", "task-4", "task-5"],
    ["task-2", "task-4", "task-6"],
    ["task-2", "task-4", "task-7"],
    ["task-2", "task-5", "task-6"],
    ["task-2", "task-5", "task-7"],
    ["task-2", "task-6", "task-7"],
    ["task-3", "task-11", "task-4"],
    ["task-3", "task-12", "task-5"],
    ["task-3", "task-13", "task-6"],
    ["task-3", "task-14", "task-7"],
    ["task-3", "task-4", "task-5"],
    ["task-3", "task-4", "task-6"],
    ["task-3", "task-4", "task-7"],
    ["task-3", "task-5", "task-6"],
    ["task-3", "task-5", "task-7"],
    ["task-3", "task-6", "task-7"],
    ["task-4", "task-12", "task-5"],
    ["task-4", "task-13", "task-6"],
    ["task-4", "task-14", "task-7"],
    ["task-4", "task-5", "task-6"],
    ["task-4", "task-5", "task-7"],
    ["task-4", "task-6", "task-7"],
    ["task-5", "task-13", "task-6"],
    ["task-5", "task-14", "task-7"],
    ["task-5", "task-6", "task-7"],
    ["task-6", "task-14", "task-7"],
    ["task-8", "task-1", "task-2"],
    ["task-8", "task-1", "task-3"],
    ["task-8", "task-1", "task-4"],
    ["task-8", "task-1", "task-5"],
    ["task-8", "task-1", "task-6"],
    ["task-8", "task-1", "task-7"],
    ["task-9", "task-2", "task-3"],
    ["task-9", "task-2", "task-4"],
    ["task-9", "task-2", "task-5"],
    ["task-9", "task-2", "task-6"],
    ["task-9", "task-2", "task-7"],
];

/* Shuffle trials */
stimOptions.sort(() => Math.random() - 0.5);

/* Shuffle mental state words within a trial */
for (var trialN = 0; trialN < stimOptions.length; trialN++) {
    stimOptions[trialN].sort(() => Math.random() - 0.5);
}

/* Select a subset of the stimOptions */
function selectedStim(numTrials) {
    return stimOptions.slice(0, numTrials);
}

export default selectedStim;