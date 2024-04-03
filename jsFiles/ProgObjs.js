export function exercise(id, name, sets, reps){
    this.id = id;
    this.name = name;
    this.sets = sets;
    this.reps = reps;
}

export function day (id, name) {
    this.id = id;
    this.name = name;
    this.exercises = [];

}
export function week(id, name){
    this.id = id;
    this.name = name;
    this.days = [];
    
}

export function programme(name, duration){
    this.name = name;
    this.duration = duration;
    this.weeks = [];
}




