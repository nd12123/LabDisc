/**
 * SlotManager - Runtime management of display slots
 * Maintains the order and allocation of display blocks to the 3 output panel slots
 */

class SlotManager {
  constructor() {
    // Map blockId -> slotIndex (0-2)
    this.slots = {};
    // Track order of first appearance: [blockId, blockId, ...]
    this.order = [];
    // Current display content for each slot
    this.content = [null, null, null];
  }

  /**
   * Get or allocate a slot for a block
   * @param {string} blockId - Unique identifier for the block
   * @returns {number} - Slot index (0-2)
   */
  getSlot(blockId) {
    // If already allocated, return existing slot
    if (this.slots.hasOwnProperty(blockId)) {
      return this.slots[blockId];
    }

    // Find first free slot (check which slots are occupied)
    const occupiedSlots = new Set(Object.values(this.slots));
    let slotIndex = -1;

    for (let i = 0; i < 3; i++) {
      if (!occupiedSlots.has(i)) {
        slotIndex = i;
        break;
      }
    }

    // If no free slots, find the oldest block and evict it
    if (slotIndex === -1) {
      // Remove the first (oldest) block from slots
      const oldestBlockId = this.order[0];
      if (oldestBlockId) {
        slotIndex = this.slots[oldestBlockId];
        delete this.slots[oldestBlockId];
        this.order.shift();
        console.warn(`Slot ${slotIndex} evicted block ${oldestBlockId} to make room for ${blockId}`);
      } else {
        slotIndex = 0; // Fallback
      }
    }

    // Allocate slot
    this.slots[blockId] = slotIndex;
    this.order.push(blockId);

    return slotIndex;
  }

  /**
   * Get the blockId currently assigned to a slot
   * @param {number} slotIndex - Slot index (0-2)
   * @returns {string|null} - BlockId or null if slot is empty
   */
  getBlockIdForSlot(slotIndex) {
    for (const [blockId, idx] of Object.entries(this.slots)) {
      if (idx === slotIndex) return blockId;
    }
    return null;
  }

  /**
   * Update content for a specific slot
   * @param {number} slotIndex - Slot index (0-2)
   * @param {object} data - Display data
   */
  setSlotContent(slotIndex, data) {
    if (slotIndex >= 0 && slotIndex < 3) {
      this.content[slotIndex] = data;
    }
  }

  /**
   * Get content for a specific slot
   * @param {number} slotIndex - Slot index (0-2)
   * @returns {object|null}
   */
  getSlotContent(slotIndex) {
    return this.content[slotIndex] || null;
  }

  /**
   * Clear all slots and reset state
   */
  reset() {
    this.slots = {};
    this.order = [];
    this.content = [null, null, null];
  }

  /**
   * Get the current state (for debugging/testing)
   */
  getState() {
    return {
      slots: { ...this.slots },
      order: [...this.order],
      content: [...this.content]
    };
  }
}

// Export as singleton
window.slotManager = new SlotManager();
export default SlotManager;
