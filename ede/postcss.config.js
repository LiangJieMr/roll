module.exports = ({ file, options, env }) => ({
  plugins: {
    'autoprefixer': env == 'prod' ? options.autoprefixer : false
  }
})