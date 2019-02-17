import Block from './Block';

export default class World {
  /**
   * @param {number} borderZ
   */
  constructor(borderZ, blocks) {
    this.blocks = blocks || [];
    this.borderZ = borderZ;
  }

  /**
   * @param {BlockData} block
   */
  addBlock(block) {
    if (block === null) {
      return; // TODO: Generate air block on the fly
    }
    const blockObject = new Block(block);
    const [x, y, z] = blockObject.position;

    if (!this.blocks[x]) {
      this.blocks[x] = [];
    }
    if (!this.blocks[x][y]) {
      this.blocks[x][y] = [];
    }

    this.blocks[x][y][z] = blockObject;
  }

  addChunk(chunk) {
    console.log('add chunk called with chunk', chunk);
    chunk.blocks.forEach(
      y => y.forEach(
        z => z.forEach(
          block => this.addBlock(block),
        ),
      ),
    );
  }

  getBlock(x, y, z) {
    if (!this.blocks[x]) {
      return undefined;
    }
    if (!this.blocks[x][y]) {
      return undefined;
    }
    return this.blocks[x][y][z];
  }

  forEachBlock(fn) {
    this.blocks.forEach(
      y => y.forEach(
        z => z.forEach(
          block => fn(block),
        ),
      ),
    );
  }

  update(delta) {
    this.forEachBlock(block => block.update(delta));
  }

  draw(scene) {
    this.forEachBlock((block) => {
      // check in all dimensions if there is null
      const [x, y, z] = block.position;

      // ok
      if (
        !this.getBlock(x - 1, y, z)
        || !this.getBlock(x + 1, y, z)
        || (y !== 0 && !this.getBlock(x, y - 1, z))
        || !this.getBlock(x, y + 1, z)
        || !this.getBlock(x, y, z - 1)
        || !this.getBlock(x, y, z + 1)
      ) {
        block.draw(scene);
      }
    });
  }
}
