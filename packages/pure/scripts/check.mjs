import { exec } from 'child_process'

const runCommand = (command, cwd, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const child = exec(command, { cwd, timeout }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`)
      } else {
        resolve(stdout)
      }
    })

    child.on('error', (error) => {
      reject(`Execution error: ${error.message}`)
    })

    child.on('exit', (code) => {
      if (code !== 0) {
        reject(`Command exited with code ${code}`)
      }
    })
  })
}

export default async function main() {
  // Not needed in this repo: the root package depends on "astro-pure": "workspace:*",
  // so pnpm already symlinks ./packages/pure into node_modules. This stays as an
  // opt-in escape hatch for consumers outside the workspace.
  if (process.env.LINK_PKG === 'true') {
    try {
      console.log('Running "pnpm link --global" at "./packages/pure"')
      console.log(await runCommand('pnpm link --global', './packages/pure'))
      console.log('Running "pnpm link --global astro-pure" at "."')
      console.log(await runCommand('pnpm link --global astro-pure', '.'))
      console.log('Commands executed successfully.')
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('LINK_PKG is not set to true. Skipping commands.')
  }
}
