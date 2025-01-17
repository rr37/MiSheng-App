import { useCallback } from 'react';

const useNextId = (data, currentDialogue) => {
  const getNextId = useCallback(() => {
    if (!currentDialogue) return null; // 如果 currentDialogue 是 null，返回 null

    if (currentDialogue?.nextId) {
      return currentDialogue.nextId; // 如果有 nextId，返回它
    }

    const nextRow = data.find(
      (row) => row.id === String(Number(currentDialogue?.id) + 1)
    );
    return nextRow ? String(Number(currentDialogue?.id) + 1) : null; // 返回下一個 ID 或 null
  }, [data, currentDialogue]);

  const canProceedToNext = useCallback(() => !!getNextId(), [getNextId]);

  return { getNextId, canProceedToNext };
};

export default useNextId;
