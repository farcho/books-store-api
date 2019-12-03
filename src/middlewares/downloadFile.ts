import path from 'path'

export function downloadFile() {
  return function (request: any, response: any, next: any) {
    try {
      const { filename } = request
      console.log('******'.repeat(50))
      console.log(filename)
      response.set('Content-Type', 'text/csv')
      response.setHeader(
        'Content-disposition',
        `attachment; filename=${filename}`
      )

      const fileLocation = path.join('../../uploads', filename);
      console.log(fileLocation);
      response.download(fileLocation, filename);
    } catch (error) {
      next(error)
    }

  }
}

