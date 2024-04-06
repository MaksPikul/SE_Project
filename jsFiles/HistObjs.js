function historyData () {
    this.primaryKey;
    this.progName;
    this.saveDate;
    this.exercises = []; //stores multiple historyExercises
}

function historyExercise () {
    this.foreignKey; // links to appropriate historyData
    this.name;
    this.sets;
    this.bestSets; // = MAX(sets * reps)"420 is the largest value hence" 
                   //formatted as 70 kg x 6
}

//one-to-many