var computeMaxCallStackSize = (function() {
    return function() {
        var size = 0;

        function cs() {
            try {
                size++;
                console.log(size)
                return cs();
            } catch(e) {
                console.log("final")
                return size + 1;
            }
        }

        return cs();
    };
}());

computeMaxCallStackSize()