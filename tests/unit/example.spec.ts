import { mount } from '@vue/test-utils'
import Twitch from '@/App.vue'

describe('App.vue', () => {
  it('renders tab 1 view', () => {
    const wrapper = mount(Twitch)
    expect(wrapper.text()).toMatch('App page')
  })
})
