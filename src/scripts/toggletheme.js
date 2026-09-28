export default () => ({
    init: function() {
        // The theme class is applied by an inline script in <head> before first paint.
        this.$refs.toggleTheme.checked = document.documentElement.className === 'theme-dark';
    },
    switchTheme: function(e) {
        const theme = e.target.checked ? 'theme-dark' : 'theme-light';
        const apply = () => {
            document.documentElement.className = theme;
            localStorage.setItem('theme', theme);
        };
        if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
            apply();
            return;
        }
        const r = e.target.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        const style = document.documentElement.style;
        style.setProperty('--vt-x', x + 'px');
        style.setProperty('--vt-y', y + 'px');
        style.setProperty('--vt-r', Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 'px');
        document.startViewTransition(apply);
    }
  })