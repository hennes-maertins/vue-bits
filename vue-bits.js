window.onload = function() {

  const MIN_NUM_BITS = 4;
  
  var app = new Vue({
    el: '#app',
    data: {
      value: null,
      bits: []
    },
    created: function() {
      for (var i = 0; i < MIN_NUM_BITS; i++) {
        this.bits.push({ pos: i, isSet: false });
      }
    },
    watch: {
      value: function() {
        this.limitValue();
        this.calculateBits();
      }
    },
    methods: {
      calculateBits: function() {
        this.expand();
        for (var i = 0; i < this.bits.length; i++) {
          this.bits[i].isSet = (this.value & Math.pow(2,i)) > 0;
        }
        this.shrink();
      },
      calculateValue: function() {
        this.value = 0;
        for (var i = 0; i < this.bits.length; i++) {
          if (this.bits[i].isSet) {
            this.value += Math.pow(2,i);
          }
        }
      },
      limitValue: function() {
        if (this.value < 0) {
          this.value = 0;
        } else if (this.value > Math.pow(2, 17) - 1) {
          this.value = Math.pow(2, 17) - 1;
        }
      },
      expand: function() {
        while (Math.pow(2, this.bits.length) <= this.value) {
          this.bits.push({ pos: this.bits[this.bits.length - 1].pos + 1, isSet: false });
        }
      },
      shrink: function() {
        while (this.bits.length > MIN_NUM_BITS && !this.bits[this.bits.length - 1].isSet) {
          this.bits.pop();
        }
      }
    }
  });
}
