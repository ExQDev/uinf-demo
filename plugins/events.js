
import Vue from 'vue'

Vue.directive('events', {
  bind (el, binding, vnode) {
    if (!binding.value) {
      console.warn('No event bindings', el)
      return
    }
    Object.keys(binding.value).forEach((key) => {
      const e = {}
      e.name = key.split('.')[0]
      e.mods = key.slice(e.name.length + 1).split('.')
      e.handler = binding.value[key] // bound function
      e.keyIsOk = false
      // supported modifiers; extend as needed
      const commonMods = ['stop', 'prevent']
      const keyMods = ['shift', 'left', 'right', 'ctrl']
      el.addEventListener(e.name, (evt) => {
        if (e.mods.length > 0) {
          const [cm, km] = [commonMods.filter(m => e.mods.includes(m)), keyMods.filter(m => e.mods.includes(m))]
          cm.forEach((c) => {
            switch (c) { // handle 'commonMods'
              case 'prevent': evt.preventDefault(); break
              case 'stop': evt.stopPropagation(); break
            }
          })
          e.keyIsOk = (!km || km.length === 0) ? true // handle 'keyMods'; no key modifiers - pass
            : !!km.reduce((a, c) => { // if key modifiers exist - make sure ALL of them are true
              let cur
              const keyCode = evt.keyCode || evt.code || evt.keyIdentifier // handle compatibility issues
              switch (c) {
                case 'ctrl': cur = evt.ctrlKey; break
                case 'shift': cur = evt.shiftKey; break
                case 'alt': cur = evt.altKey; break
                case 'left': cur = (keyCode === 37); break
                case 'right': cur = (keyCode === 39); break
              };
              return a && cur
            }, true)
          // let's run bound function
          if (e.keyIsOk) {
            vnode.context[e.handler](evt) // run bound function
          } else {
            // for more verbosity while testing; comment it out afterwards
            console.log(`key for '${e.name}' is not ok: pressed ${evt.keyCode || evt.code || evt.keyIdentifier}, expected ${km}`)
          }
        } else {
          vnode.context[e.handler](evt) // run bound function; event called without modifiers
        }
      })
    })
  }
})
