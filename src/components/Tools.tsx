import { Box, Button, CircularProgress } from "@mui/material";
import { Sort, DeleteOutline, PersonAdd } from "@mui/icons-material"; // Import icons for search, filter, and sort

interface P {
  handleGenerate: () => void;
  handleReset: () => void;
  error: string;

  isResetting: boolean;
  isGenerating: boolean;
  isEmpty: boolean;
}
function Tools({
  handleGenerate,
  handleReset,
  error,
  isEmpty,
  isGenerating,
  isResetting,
}: P) {
  return (
    <Box
      pr={4}
      py={4}
      borderRight="1px solid #e0e0e0"
      display="flex"
      flexDirection="column"
      gap={2}
      //   border="1px solid yellow"
    >
      <Box>
        <Button
          variant="outlined"
          startIcon={<Sort />}
          sx={{ borderRadius: 2 }}
        >
          Sort
        </Button>
      </Box>

      <Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleGenerate}
          disabled={!!error || isResetting}
          startIcon={
            isGenerating ? <CircularProgress size={16} /> : <PersonAdd />
          }
          sx={{ borderRadius: 2 }}
        >
          Fetch users
        </Button>
      </Box>
      <Box>
        <Button
          variant="outlined"
          onClick={handleReset}
          color="error"
          disabled={!!error || isGenerating || isEmpty}
          sx={{ borderRadius: 2 }}
          startIcon={
            isResetting ? (
              <CircularProgress size={16} color="error" />
            ) : (
              <DeleteOutline />
            )
          }
        >
          Delete All
        </Button>
      </Box>
    </Box>
  );
}

export default Tools;
